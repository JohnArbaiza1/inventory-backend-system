import ProveedoresModel from "../models/proveedores.model.js";

const ProveedorController = {

    // Obtener todos
    async getAllProveedores(req, res) {
        try {
            const proveedor = await ProveedoresModel.findAllProveedores();
            res.json(proveedor);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Obtener por ID
    async getProveedorById(req, res) {
        try {
            const proveedor = await ProveedoresModel.findProveedorById(req.params.id_proveedor);

            if (!proveedor) {
                return res.status(404).json({ error: 'Proveedor not found' });
            }

            res.json(proveedor);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Crear proveedor
    async createProveedor(req, res) {
        try {
            const { nombre_proveedor, telefono, email } = req.body;

            const proveedor = await ProveedoresModel.createNewProveedor(
                nombre_proveedor,
                telefono,
                email
            );

            res.status(201).json(proveedor);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // ACTUALIZACIÓN PARCIAL (FIX REAL)
    async updateProveedor(req, res) {
        try {
            const { id_proveedor } = req.params;
            const { nombre_proveedor, telefono, email } = req.body;

            // 1. obtener datos actuales
            const actual = await ProveedoresModel.findProveedorById(id_proveedor);

            if (!actual) {
                return res.status(404).json({ error: 'Proveedor not found' });
            }

            // 2. combinar valores (UPDATE PARCIAL)
            const nombreFinal = nombre_proveedor ?? actual.nombre_proveedor;
            const telefonoFinal = telefono ?? actual.telefono;
            const emailFinal = email ?? actual.email;

            // 3. actualizar con valores completos
            const proveedor = await ProveedoresModel.updateProveedores(
                id_proveedor,
                nombreFinal,
                telefonoFinal,
                emailFinal
            );

            res.json(proveedor);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Eliminar
    async removeProveedor(req, res) {
        try {
            const proveedor = await ProveedoresModel.removeProveedor(req.params.id_proveedor);

            if (!proveedor) {
                return res.status(404).json({ error: 'Proveedor not found' });
            }

            res.json({ message: 'Proveedor eliminado exitosamente' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export default ProveedorController;