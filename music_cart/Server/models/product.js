const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  brand: String,
  name: String,
  imageUrl: String,
  price: String,
  color: String,
  type: String,
  about: String,
  rating: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;