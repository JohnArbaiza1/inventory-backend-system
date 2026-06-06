import request from 'supertest';
import app from '../src/app.js';
import pool from '../src/config/db.js';

describe('Products API', () => {

    // IDs usados durante las pruebas
    let productId;
    let categoryId;
    let supplierId;

    beforeAll(async () => {
        // Crea datos necesarios: categoría y proveedor
        const cat = await request(app)
            .post('/api/categories')
            .send({ category_name: `Electronics-${Date.now()}-${Math.floor(Math.random() * 1000)}` });

        expect(cat.status).toBe(201);
        expect(cat.body).toHaveProperty('category_id');
        categoryId = cat.body.category_id;

        const sup = await request(app)
            .post('/api/suppliers')
            .send({
                supplier_name: 'Test',
                phone: '77777777',
                email: `test${Date.now()}@mail.com`
            });

        expect(sup.status).toBe(201);
        expect(sup.body).toHaveProperty('supplier_id');
        supplierId = sup.body.supplier_id;
    });

    it('create product', async () => {
        // Crea un producto usando la categoría y el proveedor creados
        const res = await request(app)
            .post('/api/products')
            .send({
                product_name: 'Laptop',
                price: 1000,
                stock: 10,
                category_id: categoryId,
                supplier_id: supplierId
            });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('product_id');
        productId = res.body.product_id;
    });

    it('get product', async () => {
        // Recupera el producto creado por su ID y comprueba el resultado
        const res = await request(app)
            .get(`/api/products/${productId}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('product_id', productId);
    });

    afterAll(async () => {
        // Limpia los datos creados por las pruebas
        if (productId) {
            await request(app).delete(`/api/products/${productId}`);
        }
        if (categoryId) {
            await request(app).delete(`/api/categories/${categoryId}`);
        }
        if (supplierId) {
            await request(app).delete(`/api/suppliers/${supplierId}`);
        }
        await pool.end();
    });

});