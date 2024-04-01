const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userName: { type: String, required: true },
  address: { type: String, required: true },
  payment: {
    type: String,
    enum: ['Pay on delivery', 'Card', 'UPI'],
    required: true,
  },
  items: [
    {
      imageUrl: { type: String, required: true },
      name: { type: String, required: true },
      color: { type: String, required: true },
      price: { type: String, required: true },
    }
  ],
  orderTotal: { type: String, required: true },
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

module.exports = Checkout;
