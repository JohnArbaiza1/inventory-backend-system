import SuppliersModel from "../models/suppliers.model.js";

const SupplierController = {

    // Obtener todos los suppliers
    async getAllSuppliers(req, res) {
        try {
            const suppliers = await SuppliersModel.findAllSuppliers();
            res.json(suppliers);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Obtener supplier por ID
    async getSupplierById(req, res) {
        try {
            const supplier = await SuppliersModel.findSupplierById(req.params.supplier_id);
            if (!supplier) {
                return res.status(404).json({ error: 'Supplier not found' });
            }
            res.json(supplier);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Crear un nuevo supplier
    async createSupplier(req, res) {
        try {
            const { supplier_name, phone, email } = req.body;
            const supplier = await SuppliersModel.createSupplier(supplier_name, phone, email);
            res.status(201).json(supplier);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Actualización parcial
    async updateSupplier(req, res) {
        try {
            const { supplier_id } = req.params;
            const { supplier_name, phone, email } = req.body;

            const actual = await SuppliersModel.findSupplierById(supplier_id);
            if (!actual) {
                return res.status(404).json({ error: 'Supplier not found' });
            }

            const nameFinal = supplier_name ?? actual.supplier_name;
            const phoneFinal = phone ?? actual.phone;
            const emailFinal = email ?? actual.email;

            const supplier = await SuppliersModel.updateSupplier(
                supplier_id,
                nameFinal,
                phoneFinal,
                emailFinal
            );

            res.json(supplier);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Eliminar supplier
    async removeSupplier(req, res) {
        try {
            const supplier = await SuppliersModel.removeSupplier(req.params.supplier_id);
            if (!supplier) {
                return res.status(404).json({ error: 'Supplier not found' });
            }
            res.json({ message: 'Supplier deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

export default SupplierController;