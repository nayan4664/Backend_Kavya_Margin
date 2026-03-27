const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  website: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  currency: { type: String, default: 'INR' },
  fiscalYearStart: { type: String, default: 'April' },
});

module.exports = mongoose.model('Company', companySchema, 'org_companies');