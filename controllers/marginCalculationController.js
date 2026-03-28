const MarginCalculation = require('../models/marginCalculation');

exports.getCalculations = async (req, res) => {
  try {
    const calculations = await MarginCalculation.find().sort({ date: -1 });
    res.json(calculations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCalculation = async (req, res) => {
  const calculation = new MarginCalculation(req.body);
  try {
    const newCalculation = await calculation.save();
    res.status(201).json(newCalculation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCalculation = async (req, res) => {
  try {
    await MarginCalculation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Calculation deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
