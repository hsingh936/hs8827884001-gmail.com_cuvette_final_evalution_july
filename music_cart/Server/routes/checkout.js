const express = require('express');
const router = express.Router();
const Checkout = require('../models/checkout');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/check', authMiddleware, async (req, res) => {
  try {
    const { userId, userName, address, payment, items, orderTotal } = req.body;
    
    const allowedPayments = ['Pay on delivery', 'Card', 'UPI'];
    if (!allowedPayments.includes(payment)) {
      return res.status(400).json({ error: 'Invalid payment method' });
    }

    const newCheckout = new Checkout({
      userId,
      userName,
      address,
      payment,
      items,
      orderTotal,
    });
   
    const savedCheckout = await newCheckout.save();

    res.status(201).json({ message: 'Order placed successfully', order: savedCheckout });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Error placing order' });
  }
});

router.get('/invoice/:userId', authMiddleware, async (req, res) => {
  try {
    const userId = req.params.userId;
    const checkoutData = await Checkout.find({ userId });

    if (!checkoutData) {
      return res.status(404).json({ error: 'Checkout data not found' });
    }

    res.status(200).json(checkoutData);
  } catch (error) {
    console.error('Error fetching checkout data:', error);
    res.status(500).json({ error: 'Error fetching checkout data' });
  }
});

router.get('/invo/:checkoutId', async (req, res) => {
  try {
    const checkoutId = req.params.checkoutId;
    const checkoutData = await Checkout.findById(checkoutId);

    if (!checkoutData) {
      return res.status(404).json({ error: 'Checkout data not found' });
    }

    res.status(200).json(checkoutData);
  } catch (error) {
    console.error('Error fetching checkout data:', error);
    res.status(500).json({ error: 'Error fetching checkout data' });
  }
});



module.exports = router;
