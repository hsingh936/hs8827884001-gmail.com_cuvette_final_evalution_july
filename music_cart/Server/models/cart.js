const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },

  brand: String,
  name: String,
  imageUrl: String,
  price: String,
  color: String,
 
});

const Cart = mongoose.model('Cart', productSchema);

module.exports = Cart;
