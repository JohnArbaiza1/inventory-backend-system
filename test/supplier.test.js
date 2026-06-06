import request from 'supertest';
import app from '../src/app.js';
import pool from '../src/config/db.js';

describe('Suppliers API', () => {

  // Guarda el id del supplier creado para poder usarlo en las siguientes pruebas
  let supplierId;

  describe('POST /api/suppliers', () => {
    it('should create supplier and return 201', async () => {
      // Crea un proveedor válido y comprueba que devuelve el id esperado
      const res = await request(app)
        .post('/api/suppliers')
        .send({
          supplier_name: 'Test Supplier',
          phone: '77777777',
          email: `supplier${Date.now()}@test.com`
        });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('supplier_id');
      expect(res.body).toHaveProperty('supplier_name', 'Test Supplier');
      supplierId = res.body.supplier_id;
    });

    it('should return 400 when name is missing', async () => {
      // Valida la respuesta cuando falta el campo supplier_name
      const res = await request(app)
        .post('/api/suppliers')
        .send({ phone: '77777777', email: 'test@test.com' });
      expect(res.status).toBe(400);
    });

    it('should return 400 when email is invalid', async () => {
      // Valida que el correo se valide correctamente
      const res = await request(app)
        .post('/api/suppliers')
        .send({ supplier_name: 'Test', phone: '77777777', email: 'not-an-email' });
      expect(res.status).toBe(400);
    });
  });

  describe('GET /api/suppliers', () => {
    it('should return 200 and an array', async () => {
      // Recupera todos los proveedores
      const res = await request(app).get('/api/suppliers');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('GET /api/suppliers/:id', () => {
    it('should return supplier by id', async () => {
      // Consulta el proveedor recién creado por ID
      const res = await request(app).get(`/api/suppliers/${supplierId}`);
      expect(res.status).toBe(200);
      expect(res.body.supplier_id).toBe(supplierId);
    });

    it('should return 404 for non-existent id', async () => {
      // Prueba un ID que no existe
      const res = await request(app).get('/api/suppliers/999999');
      expect(res.status).toBe(404);
    });
  });

  describe('PUT /api/suppliers/:id', () => {
    it('should update supplier', async () => {
      // Actualiza el nombre del proveedor creado
      const res = await request(app)
        .put(`/api/suppliers/${supplierId}`)
        .send({ supplier_name: 'Updated Supplier' });
      expect(res.status).toBe(200);
      expect(res.body.supplier_name).toBe('Updated Supplier');
    });

    it('should return 404 for non-existent id', async () => {
      // Intenta actualizar un proveedor inexistente
      const res = await request(app)
        .put('/api/suppliers/999999')
        .send({ supplier_name: 'Updated' });
      expect(res.status).toBe(404);
    });
  });

  describe('DELETE /api/suppliers/:id', () => {
    it('should delete supplier', async () => {
      // Elimina el proveedor creado y comprueba la respuesta
      const res = await request(app).delete(`/api/suppliers/${supplierId}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message');
    });

    it('should return 404 for already deleted supplier', async () => {
      // Comprueba que eliminar de nuevo devuelve 404
      const res = await request(app).delete(`/api/suppliers/${supplierId}`);
      expect(res.status).toBe(404);
    });
  });

  afterAll(async () => {
    // Asegura la limpieza completa del recurso si quedó sin eliminar
    if (supplierId) {
      await request(app).delete(`/api/suppliers/${supplierId}`);
    }
    await pool.end();
  });
});