# 📦 inventory backend system

![CI](https://github.com/JohnArbaiza1/inventory-backend-system/actions/workflows/blank.yml/badge.svg)

API REST para gestionar productos, categorías y proveedores, desarrollada con Node.js, PostgreSQL y Docker.

---

## 🛠️ Tech Stack

| Tecnología | Finalidad |
|---|---|
| **Node.js + Express** | REST API server |
| **PostgreSQL** | Relational database |
| **Docker + Docker Compose** | Contenedorización y orquestación |
| **Flyway** | Migraciones de bases de datos |
| **Swagger/OpenAPI** | Documentación de la API |
| **Jest + Supertest** | Pruebas automatizadas |
| **GitHub Actions** | CI pipeline |

---

## 🚀 Getting Started

### Requisitos previos
- Docker y Docker Compose instalados
- Node.js 20+

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/JohnArbaiza1/inventory-backend-system.git
cd inventory-backend-system

# Copiar las variables de entorno
cp .env.example .env

# Iniciar la base de datos
docker compose up -d db

# Ejecutar migraciones
docker compose run --rm flyway migrate

# Instalar dependencias
npm install

# Iniciar el servidor
npm run dev
```

### Ejecución de pruebas

```bash
npm test
```

---

## 📚 API Documentation

Una vez que el servidor esté en funcionamiento, visita:

```
http://localhost:9000/api-docs/
```

---

## 📁 Estructura del proyecto

```
inventory-backend-system/
├──  .github/workflows/  # CI pipeline
├── db/
│   └── migrations/     # Flyway SQL migrations
├── docs/               # Documentación de Swagger
├── src/
│   ├── config/         # Configuración de la base de datos y del servidor
│   ├── controllers/    # Gestores de solicitudes
│   ├── middlewares/    # Validación y gestión de errores
│   ├── models/         # Consultas a la base de datos
│   └── routes/         # Definiciones de rutas de la API
│   └── app.js          # Configuración principal de Express
├── test/
├── docker-compose.yml  # Entorno local con Docker
└── .env.example
```

## 👤 Autor

**John Arbaiza**
- GitHub: [@JohnArbaiza1](https://github.com/JohnArbaiza1)

