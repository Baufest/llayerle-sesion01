# Backend – JWT Authentication API

A RESTful Web API built with **Python** and **FastAPI** that implements JWT-based authentication.

## Features

- **Login endpoint**: validates credentials and issues an access token (expires in 300 s) plus a refresh token.
- **Refresh endpoint**: exchanges a valid refresh token for a new pair of tokens.
- Password hashing with **passlib[bcrypt]**.
- Dependency management with **Poetry**.
- Ready to run with **Docker** / **Docker Compose**.

---

## Project structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── auth.py       # JWT & password helpers
│   └── main.py       # FastAPI application & endpoints
├── Dockerfile
├── docker-compose.yml
├── pyproject.toml
├── poetry.lock
└── README.md
```

---

## Prerequisites

| Tool | Minimum version |
|------|----------------|
| Python | 3.11 |
| Poetry | 1.8 |
| Docker | 24 |
| Docker Compose | 2 |

---

## Running locally with Poetry

```bash
# 1. Install dependencies
cd backend
poetry install

# 2. Start the development server
poetry run uvicorn app.main:app --reload --port 8000
```

The API will be available at <http://localhost:8000>.  
Interactive docs: <http://localhost:8000/docs>

---

## Running with Docker Compose

```bash
cd backend
docker compose up --build
```

The service is exposed on port **8000**.

---

## API endpoints

### `POST /auth/login`

Authenticates a user and returns a JWT access token (valid for **300 seconds**) and a refresh token.

**Request body (JSON)**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Success response – 200**

```json
{
  "access_token": "<jwt>",
  "refresh_token": "<jwt>",
  "token_type": "bearer",
  "expires_in": 300
}
```

**Error response – 401**

```json
{
  "detail": "Invalid username or password"
}
```

---

### `POST /auth/refresh`

Exchanges a valid refresh token for a new access token and refresh token pair.

**Request body (JSON)**

```json
{
  "refresh_token": "<jwt>"
}
```

**Success response – 200**

```json
{
  "access_token": "<jwt>",
  "refresh_token": "<jwt>",
  "token_type": "bearer",
  "expires_in": 300
}
```

**Error response – 401**

```json
{
  "detail": "Invalid or expired refresh token"
}
```

---

## Quick test with curl

```bash
# 1. Log in
TOKEN=$(curl -s -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' | python3 -c "import sys,json; print(json.load(sys.stdin)['access_token'])")

echo "Access token: $TOKEN"

# 2. Refresh
REFRESH=$(curl -s -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' | python3 -c "import sys,json; print(json.load(sys.stdin)['refresh_token'])")

curl -s -X POST http://localhost:8000/auth/refresh \
  -H "Content-Type: application/json" \
  -d "{\"refresh_token\":\"$REFRESH\"}" | python3 -m json.tool
```

---

## Security notes

- The `SECRET_KEY` in `app/auth.py` is a placeholder. **Replace it with a strong random secret** before deploying to production (e.g. `openssl rand -hex 32`).
- In production, inject secrets via environment variables rather than hard-coding them.
