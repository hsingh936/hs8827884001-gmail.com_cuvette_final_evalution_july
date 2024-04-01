const express = require('express');
const router = express.Router();
const Product = require('../models/cart');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, async (req, res) => {
  try {
    const { brand, name, imageUrl, color, price } = req.body;
    const userId = req.userId; 
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID not found in request' });
    }

    const product = new Product({ brand, name, imageUrl, color, price, userId });
    await product.save();
    res.status(201).json({ message: 'Add to cart successful' });
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ error: 'Error saving product' });
  }
});


router.get('/cartCount', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId; 
    const cartCount = await Product.countDocuments({ userId });
    res.json({ count: cartCount });
  } catch (error) {
    console.error('Error fetching cart count:', error);
    res.status(500).json({ error: 'Error fetching cart count' });
  }
});


router.get('/mycart', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const cartItems = await Product.find({ userId }); 
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Error fetching cart items' });
  }
});

router.delete('/clearCart', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    await Product.deleteMany({ userId }); 
    res.status(200).json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Error clearing cart' });
  }
});


module.exports = router;
