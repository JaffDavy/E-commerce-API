import express from "express";

import {
  addProduct,
  getProducts,
  updateProduct,
  getProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/products", addProduct); // Create
router.get("/products", getProducts); // Get all
router.get("/products/:id", getProduct); // get a product
router.put("/products/:id", updateProduct); // update a product
router.delete("/products/:id", deleteProduct); //delete a product

export default router;
