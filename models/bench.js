const mongoose = require('mongoose');

const benchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bench_duration_weeks: { type: Number, required: true },
  cost_impact: { type: Number, required: true },
  primary_skill: { type: String, required: true },
  secondary_skill: { type: String },
  status: { type: String, default: 'Active' },
  reallocation_score: { type: Number }
});

module.exports = mongoose.model('Bench', benchSchema, 'bench_data');
