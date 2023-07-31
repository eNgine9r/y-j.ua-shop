// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

// Маршрут для отримання всіх товарів
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Маршрут для отримання одного товару за ID
router.get('/products/:id', getProductById, (req, res) => {
  res.json(res.product);
});

// Middleware для отримання товару за ID
async function getProductById(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Товар не знайдено' });
    }
    res.product = product;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
