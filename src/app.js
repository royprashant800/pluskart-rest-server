const express = require('express');
const app = express();
const env = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT || 2000;

// ✅ 1. Load environment variables
env.config();

// ✅ 2. Setup CORS middleware FIRST (before any routes)
app.use(cors({
  origin: 'https://pluskart-admin-app.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// ✅ 3. Explicitly handle preflight OPTIONS requests
app.options('*', cors());

// ✅ 4. Setup body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ 5. Serve static files
app.use('/public', express.static(path.join(__dirname, 'uploads')));

// ✅ 6. Connect to MongoDB
mongoose.connect(
  'mongodb+srv://royprashant300:DEA0q7KiDXuQ4mlA@cluster0.zalyi.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true // ⚠️ Note: This is deprecated in Mongoose 6+ but okay if you're using older version
  }
).then(() => {
  console.log('database connected');
}).catch((error) => {
  console.log('MongoDB connection error:', error);
});

// ✅ 7. Import and use routes (after middleware)
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const initialDataRoutes = require('./routes/admin/initialData');
const pageRoutes = require('./routes/admin/page');
const addressRoutes = require('./routes/address');
const orderRoutes = require('./routes/order');
const adminOrderRoute = require('./routes/admin/order.routes');

// ✅ 8. Mount routes
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialDataRoutes);
app.use('/api', pageRoutes);
app.use('/api', addressRoutes);
app.use('/api', orderRoutes);
app.use('/api', adminOrderRoute);

// ✅ 9. Start server
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
