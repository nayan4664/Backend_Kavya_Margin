const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  name: { type: String, required: true },
  size: { type: String, required: true },
  status: { type: String, required: true },
  date: { type: Date, required: true },
  insights: [{ 
    insightType: String, 
    title: String, 
    desc: String, 
    impact: String, 
    status: String, 
    color: String 
  }]
});

module.exports = mongoose.model('Contract', contractSchema, 'contract_data');
