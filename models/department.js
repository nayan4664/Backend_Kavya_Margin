const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  departmentName: { type: String, required: true },
  head: { type: String, required: true },
  staffCount: { type: Number, default: 0 },
  budget: { type: String, required: true },
});

module.exports = mongoose.model('Department', departmentSchema, 'org_departments');