import pool from '../config/db.js'
import logger from '../utils/logger.js';

import { createProduct, getAllProducts, getProductById, updateProductById, deleteProductById, filterProductsByCategory } from '../models/productModel.js'

// add a product
export const addProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;

        if (!name || !price) {
            logger.warn(`Attempt to add product with missing fields: ${JSON.stringify(req.body)}`);
            return res.status(400).json({ error: "Name and price are required" });
        }

        const newProduct = await createProduct({ name, description, price, category });
        logger.info(`Product created: ${newProduct.name} (ID: ${newProduct.id})`);
        res.status(201).json(newProduct);

    } catch (err) {
        logger.error(`Failed to create product: ${err.message}`);
        res.status(500).json({ error: err.message });
    }
};

// get all products in the db
export const getProducts = async (req, res) => {
    try {
        const { category } = req.query;
        let products;

        if (category) {
            products = await filterProductsByCategory(category);
            logger.info(`Products fetched by category: ${category}`);
        } else {
            products = await getAllProducts();
            logger.info('All products fetched');
        }

        res.status(200).json(products);
    } catch (error) {
        logger.error(`Failed to fetch products: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// get a single product 
export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            logger.warn(`Invalid product ID: ${id}`);
            return res.status(400).json({ error: 'Invalid product ID' });
        }

        const product = await getProductById(id);

        if (!product) {
            logger.warn(`Product not found with ID: ${id}`);
            return res.status(404).json({ error: 'Product not found' });
        }

        logger.info(`Product fetched successfully, ID: ${id}`);
        res.status(200).json(product);

    } catch (error) {
        logger.error(`Failed to fetch product ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// update a product 
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            logger.warn(`Invalid product ID: ${id}`);
            return res.status(400).json({ error: 'Invalid product ID' });
        }

        const updatedProduct = await updateProductById(id, req.body);

        if (!updatedProduct) {
            logger.warn(`Product not found with ID: ${id}`);
            return res.status(404).json({ error: 'Product not found' });
        }

        logger.info(`Product updated successfully, ID: ${id}`);
        res.status(200).json(updatedProduct);

    } catch (error) {
        logger.error(`Failed to update product ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};

// delete a product by id
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (isNaN(id)) {
            logger.warn(`Invalid product ID: ${id}`);
            return res.status(400).json({ error: 'Invalid product ID' });
        }

        const deletedProduct = await deleteProductById(id);

        if (!deletedProduct) {
            logger.warn(`Product not found with ID: ${id}`);
            return res.status(404).json({ error: 'Product not found' });
        }

        logger.info(`Product deleted successfully, ID: ${id}`);
        res.status(200).json({ message: 'Product deleted successfully' });

    } catch (error) {
        logger.error(`Failed to delete product ID ${req.params.id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
};