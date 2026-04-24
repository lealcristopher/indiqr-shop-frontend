#!/usr/bin/env python3
"""
upload.py — Faz upload do dist para o R2 (personalitte ou outro slug)
Uso: python upload.py [--slug personalitte] [--dist dist] [--bucket indiqr-shop]
"""

import argparse
import subprocess
import sys
from pathlib import Path

CONTENT_TYPES = {
    ".html":  "text/html; charset=utf-8",
    ".css":   "text/css",
    ".js":    "application/javascript",
    ".png":   "image/png",
    ".jpg":   "image/jpeg",
    ".jpeg":  "image/jpeg",
    ".svg":   "image/svg+xml",
    ".ico":   "image/x-icon",
    ".woff2": "font/woff2",
    ".woff":  "font/woff",
}

parser = argparse.ArgumentParser()
parser.add_argument("--slug",   default="personalitte",  help="Slug da empresa (subdiretório no bucket)")
parser.add_argument("--dist",   default="dist",          help="Pasta de origem")
parser.add_argument("--bucket", default="indiqr-shop",   help="Nome do bucket R2")
args = parser.parse_args()

dist = Path(__file__).parent / args.dist
if not dist.exists():
    sys.exit(f"Pasta não encontrada: {dist}  —  rode build.py primeiro")

files = [f for f in dist.rglob("*") if f.is_file()]
print(f"Enviando {len(files)} arquivo(s) para r2://{args.bucket}/{args.slug}/\n")

errors = []
for f in sorted(files):
    rel  = f.relative_to(dist)
    key  = f"{args.slug}/{rel.as_posix()}"
    ct   = CONTENT_TYPES.get(f.suffix.lower(), "application/octet-stream")

    result = subprocess.run(
        f'wrangler r2 object put "{args.bucket}/{key}" --file "{f}" --content-type "{ct}" --remote',
        capture_output=True, text=True, shell=True
    )

    if result.returncode == 0:
        print(f"  OK  {key}")
    else:
        print(f"  ERR {key}")
        errors.append((key, result.stderr.strip()))

print()
if errors:
    print(f"{len(errors)} erro(s):")
    for key, err in errors:
        print(f"  {key}: {err}")
    sys.exit(1)
else:
    print(f"Upload concluído: {len(files)} arquivo(s) em r2://{args.bucket}/{args.slug}/")
