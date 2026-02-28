import os
import json
import time
import httpx
import uvicorn
from fastapi import FastAPI, BackgroundTasks 
from pydantic import BaseModel
from typing import Optional, Dict

app = FastAPI(title="HTTP Relay Node")

class RelayInstruction(BaseModel):
    url: str
    method: str = "GET"
    headers: Optional[Dict[str, str]] = None
    params: Optional[Dict[str, str]] = None 
    body: Optional[str] = None
    timeout: Optional[float] = 30.0


@app.post("/relay")
async def execute_relay(instruction: RelayInstruction, background_tasks: BackgroundTasks):
    start_time = time.perf_counter() # Inicia o cronômetro
    
    async with httpx.AsyncClient(follow_redirects=True) as client:
        try:
            # 1. Faz a requisição ao alvo
            resp = await client.request(
                method=instruction.method,
                url=instruction.url,
                headers=instruction.headers,
                params=instruction.params,
                content=instruction.body,
                timeout=instruction.timeout
            )
            
            latency = (time.perf_counter() - start_time) * 1000 # Latência em ms
            
            target_response = {
                "status_code": resp.status_code,
                "headers": dict(resp.headers),
                "body": resp.text
            }

            # 2. AGENDA a persistência no Grafana Loki em background
            # Isso dispara o envio sem travar o 'return' abaixo
            background_tasks.add_task(
                persist_to_loki, 
                instruction, 
                target_response, 
                latency
            )
            
            # 3. Responde para o seu PowerShell na hora
            return {
                "node_info": {"name": os.getenv("NODE_NAME", "unnamed")},
                "target_response": target_response,
                "latency_ms": latency
            }

        except Exception as e:
            # Mesmo em erro, você pode querer logar a falha no Loki
            return {"error": str(e)}
        
async def persist_to_loki(instruction, target_response, latency):
    loki_url = os.getenv("LOKI_URL") 
    loki_user = os.getenv("LOKI_USER")
    loki_token = os.getenv("LOKI_TOKEN")

    payload = {
        "streams": [
            {
                "stream": {
                    "job": "web-relay-audit",
                    "node": os.getenv("NODE_NAME", "default"),
                    "method": instruction.method,
                    "status": str(target_response["status_code"]),
                    "target_host": instruction.url.split('/')[2] if "://" in instruction.url else "unknown"
                },
                "values": [
                    [
                        str(time.time_ns()), 
                        json.dumps({
                            "url_base": instruction.url.split('?')[0], # URL limpa
                            "params": instruction.params,              # <--- PARAMS ESTRUTURADOS
                            "req_headers": instruction.headers,
                            "req_body": instruction.body,
                            "res_headers": target_response["headers"],
                            "res_body": target_response["body"],
                            "latency_ms": round(latency, 2)            # Latência arredondada
                        })
                    ]
                ]
            }
        ]
    }
    
    async with httpx.AsyncClient() as client:
        await client.post(loki_url, json=payload, auth=(loki_user, loki_token))
        

@app.get("/health")
async def health():
    return {"status": "ready", "node": os.getenv("NODE_NAME", "unnamed-node")}



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run(app, host="0.0.0.0", port=port)