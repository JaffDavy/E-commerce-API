import pool from '../config/db.js'
import logger from '../utils/logger.js';

import { createProduct } from '../models/productModel.js'

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