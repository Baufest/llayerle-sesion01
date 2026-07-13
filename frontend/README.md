# Frontend – Aplicación React con Autenticación JWT

Aplicación web desarrollada en **React** + **Vite** que implementa autenticación JWT utilizando el backend de esta misma aplicación.

## Funcionalidades

- **Página de Login** (`/login`): formulario de usuario y contraseña que se comunica con el backend para obtener un JWT.
- **Página de Bienvenida** (`/welcome`): ruta protegida, accesible únicamente después de iniciar sesión.
- El token JWT se almacena en `sessionStorage` (la sesión se pierde al cerrar la pestaña).
- Protección de rutas: cualquier intento de acceder a `/welcome` sin estar autenticado redirige automáticamente a `/login`.
- Botón de **Cerrar Sesión** que elimina el token de la sesión y redirige al login.

---

## Estructura del proyecto

```
frontend/
├── public/
├── src/
│   ├── components/
│   │   └── ProtectedRoute.jsx   # Componente de ruta protegida
│   ├── context/
│   │   └── AuthContext.jsx      # Contexto de autenticación (proveedor + hook)
│   ├── pages/
│   │   ├── LoginPage.jsx        # Página de inicio de sesión
│   │   ├── LoginPage.css
│   │   ├── WelcomePage.jsx      # Página de bienvenida (protegida)
│   │   └── WelcomePage.css
│   ├── App.jsx                  # Enrutamiento principal
│   ├── index.css
│   └── main.jsx
├── .env.example                 # Variables de entorno de ejemplo
├── index.html
├── package.json
└── vite.config.js
```

---

## Requisitos previos

| Herramienta | Versión mínima |
|-------------|---------------|
| Node.js     | 18            |
| npm         | 9             |

---

## Instrucciones de uso

### 1. Iniciar el backend

Asegúrese de que el backend esté corriendo en `http://localhost:8000`. Consulte [`backend/README.md`](../backend/README.md) para instrucciones detalladas.

```bash
# Con Poetry
cd backend
poetry install
poetry run uvicorn app.main:app --reload --port 8000

# Con Docker Compose
cd backend
docker compose up --build
```

### 2. Configurar variables de entorno (opcional)

El frontend apunta por defecto a `http://localhost:8000`. Si necesita cambiar la URL del backend, copie el archivo de ejemplo y edítelo:

```bash
cd frontend
cp .env.example .env.local
# Edite VITE_BACKEND_URL si el backend corre en otro host/puerto
```

### 3. Instalar dependencias

```bash
cd frontend
npm install
```

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La aplicación estará disponible en <http://localhost:5173>.

### 5. Construir para producción

```bash
npm run build
```

Los archivos compilados quedarán en la carpeta `dist/`.

---

## Credenciales de prueba

| Usuario | Contraseña |
|---------|-----------|
| admin   | admin123  |

> Estas credenciales están definidas en el backend (`backend/app/auth.py`).

---

## Tecnologías utilizadas

- [React 19](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router v7](https://reactrouter.com/)
