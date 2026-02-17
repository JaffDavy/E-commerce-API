import pool from '../config/db.js'

export const createProduct = async (product) => {
    const { name, description, price, category } = product;
    const result = await pool.query(
       'INSERT INTO products (name, description, price, category) VALUES ($1, $2, $3, $4) RETURNING *',
        [name, description, price, category]
    );
    return result.rows[0];
};