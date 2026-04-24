#!/usr/bin/env python3
"""
build.py — Gerador de site estático para personnalité
Uso: python build.py [--data data.json] [--out dist]
"""

import argparse
import json
import shutil
from pathlib import Path

try:
    from jinja2 import Environment, FileSystemLoader
except ImportError:
    raise SystemExit(
        "Jinja2 não encontrado. Instale com:\n  pip install jinja2"
    )


# ── ARGS ────────────────────────────────────────────────────────
parser = argparse.ArgumentParser(description="Gera site estático da personnalité")
parser.add_argument("--data",  default="data.json",    help="Arquivo de dados JSON")
parser.add_argument("--out",   default="dist",         help="Pasta de saída")
parser.add_argument("--tmpl",  default="template.html",help="Template Jinja2")
args = parser.parse_args()

SRC_DIR  = Path(__file__).parent
OUT_DIR  = SRC_DIR / args.out
DATA_FILE = SRC_DIR / args.data
TMPL_FILE = args.tmpl

# ── CARREGAR DADOS ───────────────────────────────────────────────
print(f"📂  Lendo dados de: {DATA_FILE}")
with open(DATA_FILE, encoding="utf-8") as f:
    data = json.load(f)

site       = data["site"]
categories = data["categories"]
products   = data["products"]
hero       = data["hero"]

# ── PREPARAR SAÍDA ───────────────────────────────────────────────
OUT_DIR.mkdir(parents=True, exist_ok=True)
print(f"📁  Pasta de saída: {OUT_DIR}")

# ── RENDERIZAR TEMPLATE ──────────────────────────────────────────
env = Environment(
    loader=FileSystemLoader(str(SRC_DIR)),
    autoescape=True,
)
template = env.get_template(TMPL_FILE)

html = template.render(
    site=site,
    categories=categories,
    products=products,
    hero=hero,
)

out_html = OUT_DIR / "index.html"
out_html.write_text(html, encoding="utf-8")
print(f"✅  index.html gerado → {out_html}")

# ── COPIAR ASSETS ESTÁTICOS ──────────────────────────────────────
STATIC_FILES = ["style.css", "script.js"]

for fname in STATIC_FILES:
    src = SRC_DIR / fname
    if src.exists():
        shutil.copy2(src, OUT_DIR / fname)
        print(f"📄  Copiado: {fname}")
    else:
        print(f"⚠️   Não encontrado (pulando): {fname}")

# Copiar logo local, se definida e não for URL externa
logo_url = site.get("logo_url", "")
if logo_url and not logo_url.startswith("http"):
    logo_src = SRC_DIR / logo_url
    if logo_src.exists():
        shutil.copy2(logo_src, OUT_DIR / logo_src.name)
        print(f"🖼️   Logo copiada: {logo_src.name}")
    else:
        print(f"⚠️   Logo não encontrada: {logo_url}")

# Copiar pasta de imagens, se existir
img_dir = SRC_DIR / "images"
if img_dir.exists():
    dest_img = OUT_DIR / "images"
    if dest_img.exists():
        shutil.rmtree(dest_img)
    shutil.copytree(img_dir, dest_img)
    print(f"🖼️   Pasta images/ copiada")

# ── RESUMO ───────────────────────────────────────────────────────
print()
print("─" * 40)
print(f"  {len(categories)} categorias")
print(f"  {len(products)} produtos")
print(f"  Saída: {OUT_DIR}/")
print("─" * 40)
print("✨  Build concluído! Para visualizar:")
print(f"     cd {OUT_DIR} && python3 -m http.server 8080")
print()
