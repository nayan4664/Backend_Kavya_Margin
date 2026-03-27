const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceId: { type: String, required: true, unique: true },
  clientName: { type: String, required: true },
  project: { type: String, required: true },
  date: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  items: [{ 
    description: String, 
    hours: Number, 
    rate: Number, 
    amount: Number 
  }],
  taxRate: { type: Number, default: 18 },
  notes: { type: String },
  status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Invoice', invoiceSchema, 'bill_invoices');
