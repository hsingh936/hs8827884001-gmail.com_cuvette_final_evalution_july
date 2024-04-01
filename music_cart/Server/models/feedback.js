const mongoose = require('mongoose');


const feedbackSchema = new mongoose.Schema({
  type: { type: String, enum: ['bugs', 'feedback', 'query'], required: true }, 
  feedbackText: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  createdAt: { type: Date, default: Date.now }, 
});


const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
