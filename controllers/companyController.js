const Company = require('../models/company');

// Get company details
exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findOne();
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create or update company details
exports.updateCompany = async (req, res) => {
  try {
    const existingCompany = await Company.findOne();
    if (existingCompany) {
      const updatedCompany = await Company.findByIdAndUpdate(existingCompany._id, req.body, { new: true });
      res.json(updatedCompany);
    } else {
      const newCompany = new Company(req.body);
      await newCompany.save();
      res.status(201).json(newCompany);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};