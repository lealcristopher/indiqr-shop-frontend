FROM python:3.11-slim

WORKDIR /app

RUN pip install --no-cache-dir fastapi uvicorn httpx pydantic

COPY main.py .

# Variáveis padrão
ENV NODE_NAME="relay-node-01"
ENV PORT=8080

EXPOSE 8080

CMD ["python", "main.py"]