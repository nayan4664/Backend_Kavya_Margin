const mongoose = require('mongoose');

const marginSchema = new mongoose.Schema({
  name: { type: String, required: true },
  client: { type: String, required: true },
  margin: { type: Number, required: true },
  revenue: { type: String, required: true }, // Keeping as string to match "₹4.5M" format
  status: { 
    type: String, 
    enum: ['On Track', 'At Risk', 'Exceeding', 'Pending'],
    default: 'On Track'
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Margin', marginSchema, 'margin_data');
