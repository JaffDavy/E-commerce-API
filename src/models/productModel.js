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