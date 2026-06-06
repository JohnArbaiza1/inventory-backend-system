# 📦 inventory backend system

[![CI](https://github.com/JohnArbaiza1/inventory-backend-system/actions/workflows/blank.yml/badge.svg)](https://github.com/JohnArbaiza1/inventory-backend-system/actions)
[![Node](https://img.shields.io/badge/node-20.x-brightgreen)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/docker-ready-blue)](https://www.docker.com/)

## 🚀 Descripción del proyecto

API REST para la gestión de inventario que permite administrar productos, categorías y proveedores.

Está construida con Node.js, Express y PostgreSQL, utilizando Docker para el entorno de desarrollo y Swagger/OpenAPI para la documentación.

---

## ✨ Características

* CRUD completo para productos, categorías y proveedores
* Migraciones de base de datos con Flyway
* Documentación interactiva con Swagger / OpenAPI
* Pruebas automatizadas con Jest y Supertest
* Entorno de desarrollo containerizado con Docker Compose

---

## 📌 Descripción

Inventory Backend System es una API diseñada como base para sistemas de inventario, paneles administrativos o microservicios.

Su estructura permite escalar fácilmente e integrar un frontend o servicios externos.

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
git clone https://github.com/JohnArbaiza1/inventory-backend-system.git
cd inventory-backend-system

# Copiar variables de entorno
cp .env.example .env

# Levantar servicios (DB, etc.)
docker compose up -d

# Ejecutar migraciones
docker compose run --rm flyway migrate

# Iniciar la aplicación (localmente con node) si se necesita
npm install
npm run dev
```

## Instalación Local (sin Docker)

```bash
cp .env.example .env
npm install
npm run dev
```

## Variables de Entorno

Revisa [.env.example](.env.example) y completa las variables antes de ejecutar.
- `PORT`: puerto en el que correrá la app (ej. 9000)
- `NODE_ENV`: development | production
- `DB_HOST`: host de PostgreSQL
- `DB_PORT`: puerto de PostgreSQL (ej. 5432 o 5434)
- `DB_NAME`: nombre de la base de datos
- `DB_USER`: usuario DB
- `DB_PASSWORD`: contraseña DB

## Migraciones

- Levanta la base de datos con Docker Compose y ejecuta:

```bash
docker compose run --rm flyway migrate
```

- Las migraciones están en la carpeta `db/migrations/`.

## Documentación de la API

La documentación Swagger está disponible en:

```
http://localhost:9000/api-docs
```

## Ejemplos de uso

- Listar productos:

```bash
curl http://localhost:9000/api/products
```

- Crear categoría (ejemplo):

```bash
curl -X POST http://localhost:9000/api/categories \
  -H "Content-Type: application/json" \
  -d '{"category_name":"Electrónica","description":"Dispositivos y accesorios"}'
```

## Tests

Ejecutar la suite de pruebas:

```bash
npm test
```

## Estructura del Proyecto

```
inventory-backend-system/
├── db/migrations/         # Migraciones Flyway
├── docs/                  # Swagger/OpenAPI
├── src/
│   ├── config/            # Configuración (DB, server)
│   ├── controllers/       # Lógica de controladores
│   ├── middlewares/       # Validaciones y manejo de errores
│   ├── models/            # Acceso a datos
│   └── routes/            # Definición de rutas
├── test/                  # Pruebas automatizadas
├── docker-compose.yml
└── .env.example
```

## 👤 Author

**John Arbaiza**
- GitHub: [@JohnArbaiza1](https://github.com/JohnArbaiza1)


