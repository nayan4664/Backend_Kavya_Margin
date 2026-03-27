const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  CTC: { type: Number, required: true },
  monthlyCost: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  joiningDate: { type: Date, required: true },
  variablePay: { type: Number },
  location: { type: String }
});

module.exports = mongoose.model('Employee', employeeSchema, 'emp_employees');
