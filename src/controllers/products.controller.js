import ProductsModel from "../models/product.model.js";

const ProductsController = {

    async getAllProducts(req, res) {
        try {
            const products = await ProductsModel.findAllProducts();
            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async getProductById(req, res) {
        try {
            const product = await ProductsModel.findProductById(req.params.id_product);

            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }

            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async createProduct(req, res) {
        try {
            const {
                nombre_producto,
                descripcion,
                precio,
                stock,
                id_categoria,
                id_proveedor
            } = req.body;

            const product = await ProductsModel.createProduct(
                nombre_producto,
                descripcion,
                precio,
                stock,
                id_categoria,
                id_proveedor
            );

            res.status(201).json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async updateProduct(req, res) {
        try {
            const { id_product } = req.params;
            const {
                nombre_producto,
                descripcion,
                precio,
                stock,
                id_categoria,
                id_proveedor
            } = req.body;

            const product = await ProductsModel.updateProduct(
                id_product,
                nombre_producto,
                descripcion,
                precio,
                stock,
                id_categoria,
                id_proveedor
            );

            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }

            res.json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async deleteProduct(req, res) {
        try {
            const product = await ProductsModel.deleteProduct(req.params.id_product);

            if (!product) {
                return res.status(404).json({ error: "Product not found" });
            }

            res.json({ message: "Product deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

export default ProductsController;