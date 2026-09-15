# CALDER API (`backend`)

Express 5 + MongoDB. Vitrin `main` dalında: https://github.com/erimlers/e-commerce

## Çalıştırma

MongoDB `127.0.0.1:27017` üzerinde olmalı. Docker varsa: `docker compose up -d`. Yerel `mongod` çalışıyorsa compose gerekmez.

```bash
cp .env.example .env
npm install
npm run dev
```

API: `http://localhost:8080`  
Sağlık: `GET http://localhost:8080/health` → `{ "ok": true, "db": "up" }`
