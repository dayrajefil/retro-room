# Retro Room — MrsMelancholic

Site pessoal interativo inspirado na internet dos anos 2000.
Um quarto virtual pixel art onde visitantes exploram gostos, coleções e segredos.

## Stack

- **Frontend:** HTML + CSS + JavaScript puro (ES Modules nativos, sem framework)
- **Canvas API** — renderização do quarto pixel art
- **Web Crypto API** — hash SHA-256 das senhas localmente
- **localStorage** — sessão e estado persistidos no browser
- **Backend:** Python 3 stdlib (`http.server`, `json`, `hashlib`) — sem dependências externas

## Como rodar

```bash
python3 server.py
```

Acesse `http://localhost:3000`.

> O `server.py` serve os arquivos estáticos e persiste logins em `data/users.json`. Nenhuma instalação necessária.
