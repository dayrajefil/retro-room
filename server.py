#!/usr/bin/env python3
"""
Servidor do Retro Room.
Serve os arquivos estáticos e salva usuários em data/users.json.
Uso: python3 server.py
"""

import http.server
import json
import hashlib
from pathlib import Path

PORT      = 3000
DATA_DIR  = Path('data')
USERS_FILE = DATA_DIR / 'users.json'

DATA_DIR.mkdir(exist_ok=True)


def load_users():
    if USERS_FILE.exists():
        return json.loads(USERS_FILE.read_text(encoding='utf-8'))
    return {}


def save_users(users):
    USERS_FILE.write_text(
        json.dumps(users, indent=2, ensure_ascii=False),
        encoding='utf-8',
    )


def hash_pw(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


class Handler(http.server.SimpleHTTPRequestHandler):

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_POST(self):
        if self.path != '/api/auth':
            self.send_error(404)
            return

        length = int(self.headers.get('Content-Length', 0))
        try:
            body = json.loads(self.rfile.read(length))
        except Exception:
            self._json(400, {'ok': False, 'error': 'JSON inválido.'})
            return

        username = body.get('username', '').strip().lower()
        password = body.get('password', '').strip().lower()

        if not username or not password:
            self._json(200, {'ok': False, 'error': 'Preencha todos os campos.'})
            return

        users = load_users()
        pw_hash = hash_pw(password)

        if username not in users:
            # Novo usuário — registra
            users[username] = {
                'passwordHash': pw_hash,
                'createdAt': body.get('now', ''),
                'accessCount': 1,
            }
            save_users(users)
            self._json(200, {'ok': True, 'created': True})
        elif users[username]['passwordHash'] != pw_hash:
            self._json(200, {'ok': False, 'error': 'Senha incorreta.'})
        else:
            users[username]['accessCount'] = users[username].get('accessCount', 0) + 1
            save_users(users)
            self._json(200, {'ok': True, 'created': False})

    def _json(self, status, data):
        body = json.dumps(data, ensure_ascii=False).encode()
        self.send_response(status)
        self._cors()
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def _cors(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')

    def log_message(self, fmt, *args):
        # Mostra só erros (4xx / 5xx)
        if args and str(args[1]).startswith(('4', '5')):
            super().log_message(fmt, *args)


if __name__ == '__main__':
    with http.server.HTTPServer(('', PORT), Handler) as srv:
        print(f'Retro Room → http://localhost:{PORT}')
        srv.serve_forever()
