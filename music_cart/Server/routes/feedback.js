const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/feedback', authMiddleware, async (req, res) => {
  try {
    const { type, feedbackText, userId } = req.body; 
    
    const newFeedback = new Feedback({
      type,
      feedbackText,
      userId,
    });

    const savedFeedback = await newFeedback.save();

    res.status(201).json(savedFeedback); 
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ error: 'Failed to save feedback' });
  }
});

module.exports = router;
