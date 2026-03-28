const mongoose = require('mongoose');

const riskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  impact: { type: String, enum: ['High', 'Medium', 'Low'], required: true },
  probability: { type: String, required: true },
  score: { type: Number, required: true },
  category: { type: String, required: true },
  action: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Risk', riskSchema, 'ai_riskanalysis');
