const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const errorHandler = require('../errorhandler/errorHandler');

router.get('/all', async (req, res) => {
  try {
   
    const products = await Product.find();
    res.json(products);
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/headphoneTypes', async (req, res) => {
  try {
   
    const uniqueTypes = await Product.aggregate([
      { $group: { _id: '$type' } }, 
      { $project: { _id: 0, type: '$_id' } }, 
    ]);

    res.status(200).json(uniqueTypes);
  } 
  catch (error) {
    errorHandler(req, res, error);
  }
});

router.get('/brand/:brandName', async (req, res) => {
  try {
    const brandName = req.params.brandName;
    const products = await Product.find({ brand: brandName });
    res.json(products);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/color/:productColor', async (req, res) => {
  try {
    const productColor = req.params.productColor;
    const products = await Product.find({ color: productColor });
    res.json(products);
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/price/:minPrice/:maxPrice', async (req, res) => {
  try {
    const minPrice = parseFloat(req.params.minPrice.replace('₹', '').replace(',', ''));
    const maxPrice = parseFloat(req.params.maxPrice.replace('₹', '').replace(',', ''));
    
    const products = await Product.find({ price: { $gte: minPrice, $lte: maxPrice } });

    res.json(products);
  } 
  
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    errorHandler(req, res, error);
  }
});


module.exports = router;
