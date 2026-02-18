import express from 'express'

import { addProduct, getProducts } from '../controllers/productController.js'

const router = express.Router()

router.post('/products', addProduct);    // Create
router.get('/products', getProducts);    // Get all


export default router