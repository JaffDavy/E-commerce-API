import 'dotenv/config'
import pg from 'pg'
import logger from '../utils/logger.js'

const { Pool } = pg

const isProduction = process.env.NODE_ENV === 'production'

const poolConfig = isProduction
  ? {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    }
  : {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      port: parseInt(process.env.DB_PORT, 10),
    };

const pool = new Pool(poolConfig)

// connect to the database with logging 

export const connectToDb = async () => {
    try {
        logger.info(`Attempting DB connection. Mode: ${isProduction ? 'Production' : 'Local'}`)
        const client = await pool.connect()
        logger.info('✅ Successfully connected to the database');
        client.release()
    } catch (err) {
        logger.error(`❌ DATABASE CONNECTION ERROR:', err.message`)
        process.exit(1)
    }
}

// executes queries with logging performance

export const query = async (text, params) => {
    const start = Date.now()
     try {
        const response = await pool.query(text, params)
        const duration = Date.now() - start
        logger.info(`Query executed in ${duration}ms: ${text.substring(0, 100)}`)
        return response
     } catch (error) {
        logger.error(`Error executing query: ${error.message}`)
        throw error
     }
}

export default pool