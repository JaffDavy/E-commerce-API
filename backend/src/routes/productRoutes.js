import express from 'express'

import { addProduct, getProducts, updateProduct, getProduct, deleteProduct  } from '../controllers/productController.js'

const router = express.Router()

router.post('/products', addProduct)    // Create
router.get('/products', getProducts)    // Get all
router.get('/product/:id', getProduct)   // get a product
router.put('/product/:id', updateProduct) // updete a product
router.delete('/product/:id', deleteProduct) //delete a product

export default router
