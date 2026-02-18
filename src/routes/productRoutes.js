import express from 'express'

import { addProduct, getProducts, getProduct, updateProduct  } from '../controllers/productController.js'

const router = express.Router()

router.post('/products', addProduct)    // Create
router.get('/products', getProducts)    // Get all
router.get('/product/:id', getProduct)   // get a product
router.put('/product/:id', updateProduct) // updete a product


export default router