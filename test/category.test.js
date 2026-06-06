import request from 'supertest';
import app from '../src/app.js';
import pool from '../src/config/db.js';

describe('Categories API', () => {

    // Identificador de la categoría creada para las pruebas
    let id;
    const categoryName = `TestCategory-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    it('create', async () => {
        // Crea una nueva categoría en la API
        const res = await request(app)
            .post('/api/categories')
            .send({ category_name: categoryName });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('category_id');
        id = res.body.category_id;
    });

    it('get by id', async () => {
        // Consulta la categoría creada por su ID
        const res = await request(app)
            .get(`/api/categories/${id}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('category_id', id);
    });

    afterAll(async () => {
        // Limpia la categoría creada y cierra la conexión al pool de Postgres
        if (id) {
            await request(app).delete(`/api/categories/${id}`);
        }
        await pool.end();
    });

});