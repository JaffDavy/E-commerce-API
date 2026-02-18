import pool from '../config/db.js'
import logger from '../utils/logger.js';

export const createProduct = async (product) => {
    const { name, description, price, category } = product;
    const result = await pool.query(
       'INSERT INTO products (name, description, price, category) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, description, price, category]
    );
    return result.rows[0];
};

export const getAllProducts = async () => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY id');
        logger.info(`Fetched all products, count: ${result.rows.length}`);
        return result.rows;
    } catch (err) {
        logger.error(`Failed to fetch all products: ${err.message}`);
        throw err;
    }
};

export const getProductById = async (id) => {
    try {
        const result = await pool.query(
            'SELECT * FROM products WHERE id = $1',
            [id]
        );

        if (result.rowCount === 0) {
            logger.warn(`Product not found with ID: ${id}`);
            return null;
        }

        logger.info(`Product fetched successfully, ID: ${id}`);
        return result.rows[0];
    } catch (err) {
        logger.error(`Failed to fetch product ID ${id}: ${err.message}`);
        throw err;
    }
};

export const updateProductById = async (id, data) => {
    try {
        const { name, price, description, category } = data;

        const result = await pool.query(
            `
            UPDATE products
            SET 
                name = COALESCE($1, name),
                price = COALESCE($2, price),
                description = COALESCE($3, description),
                category = COALESCE($4, category),
                created_at = NOW()
            WHERE id = $5
            RETURNING *
            `,
            [name, price, description, category, id]
        );

        if (result.rowCount === 0) {
            logger.warn(`Product not found with ID: ${id}`);
            return null;
        }

        logger.info(`Product updated successfully, ID: ${id}`);
        return result.rows[0];

    } catch (err) {
        logger.error(`Failed to update product ID ${id}: ${err.message}`);
        throw err;
    }
};

export const deleteProductById = async (id) => {
    try {
        const result = await pool.query(
            'DELETE FROM products WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rowCount === 0) {
            logger.warn(`Product not found with ID: ${id}`);
            return null;
        }

        logger.info(`Product deleted successfully, ID: ${id}`);
        return result.rows[0];

    } catch (err) {
        logger.error(`Failed to delete product ID ${id}: ${err.message}`);
        throw err;
    }
};
