require('dns').setDefaultResultOrder('ipv4first');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
  ...(process.env.CORS_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
];

// Allow local development, configured origins, and Render-hosted frontends.
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    const isAllowed =
      allowedOrigins.includes(origin) ||
      /^https:\/\/[a-z0-9-]+\.onrender\.com$/i.test(origin);

    if (isAllowed) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
}));
app.use(express.json());

// Connect to MongoDB
console.log("Connecting to MongoDB Atlas...");
console.log("MONGO_URI:", process.env.MONGO_URI ? process.env.MONGO_URI.replace(/\/\/.*@/, '//***@') : 'NOT SET');

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Atlas connected successfully!');
    console.log('📊 Database:', mongoose.connection.name);
  })
  .catch(err => {
    console.error('❌ MongoDB Atlas connection error:');
    console.error('Error Name:', err.name);
    console.error('Error Message:', err.message);
    if (err.message.includes('ECONNREFUSED')) {
      console.error('👉 TIP: Connection refused - check if the server is running and network is accessible.');
    }
    if (err.message.includes('querySrv')) {
      console.error('👉 TIP: This is usually a DNS or Network issue.');
      console.error('👉 Ensure your IP is whitelisted in MongoDB Atlas (Network Access -> 0.0.0.0/0).');
      console.error('👉 If you are using a VPN or Corporate Network, try disconnecting it.');
    }
    if (err.message.includes('AuthenticationFailed')) {
      console.error('👉 TIP: Authentication failed - check username and password in connection string.');
    }
  });

// Routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const dbStates = {
      0: 'disconnected',
      1: 'connected',
      2: 'connecting',
      3: 'disconnecting'
    };
    res.json({
      status: 'ok',
      database: {
        state: dbStates[dbState],
        name: mongoose.connection.name,
        host: mongoose.connection.host
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

const employeeRoutes = require('./routes/employees');
app.use('/api/employees', employeeRoutes);

const benchRoutes = require('./routes/bench');
app.use('/api/bench', benchRoutes);

const invoiceRoutes = require('./routes/invoices');
app.use('/api/invoices', invoiceRoutes);

const revenueRoutes = require('./routes/revenue');
app.use('/api/revenue', revenueRoutes);

const contractRoutes = require('./routes/contracts');
app.use('/api/contracts', contractRoutes);

const companyRoutes = require('./routes/company');
app.use('/api/company', companyRoutes);

const dashboardRoutes = require('./routes/dashboard');
app.use('/api/dashboard', dashboardRoutes);

const forecastRoutes = require('./routes/forecast');
app.use('/api/forecast', forecastRoutes);

const resourceRoutes = require('./routes/resources');
app.use('/api/resources', resourceRoutes);

const riskRoutes = require('./routes/risks');
app.use('/api/risks', riskRoutes);

const marginRoutes = require('./routes/margins');
app.use('/api/margins', marginRoutes);

const billingModelRoutes = require('./routes/billingModel');
app.use('/api/billing-models', billingModelRoutes);

const departmentRoutes = require('./routes/department');
app.use('/api/departments', departmentRoutes);

const rateConfigRoutes = require('./routes/rateConfig');
app.use('/api/rate-configs', rateConfigRoutes);

const marginCalculationRoutes = require('./routes/marginCalculation');
app.use('/api/margin-calculations', marginCalculationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
