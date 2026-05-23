import ProductsModel from "../models/products.model.js";

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
            const product = await ProductsModel.findProductById(req.params.product_id);

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
                product_name,
                description,
                price,
                stock,
                category_id,
                supplier_id
            } = req.body;

            const product = await ProductsModel.createProduct(
                product_name,
                description,
                price,
                stock,
                category_id,
                supplier_id
            );

            res.status(201).json(product);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    async updateProduct(req, res) {
        try {
            const { product_id } = req.params;
            const {
                product_name,
                description,
                price,
                stock,
                category_id,
                supplier_id
            } = req.body;

            const product = await ProductsModel.updateProduct(
                product_id,
                product_name,
                description,
                price,
                stock,
                category_id,
                supplier_id
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
            const product = await ProductsModel.deleteProduct(req.params.product_id);

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