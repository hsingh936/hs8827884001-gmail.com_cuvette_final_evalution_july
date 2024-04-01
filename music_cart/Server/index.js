const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const checkoutRoutes = require('./routes/checkout');
const feedbackRoutes = require('./routes/feedback');
const errorHandler = require('./errorhandler/errorHandler'); 

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'https://musicart-mern.vercel.app', 
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true
}));


mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((error) => console.log(error));

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});


app.use('/auth', authRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/feed', feedbackRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to Music Cart API');
});


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
