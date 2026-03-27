const Risk = require('../models/risk');

exports.getAllRisks = async (req, res) => {
  try {
    const risks = await Risk.find().sort({ score: -1 });
    res.json(risks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createRisk = async (req, res) => {
  const risk = new Risk(req.body);
  try {
    const newRisk = await risk.save();
    res.status(201).json(newRisk);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateRisk = async (req, res) => {
  try {
    const risk = await Risk.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(risk);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteRisk = async (req, res) => {
  try {
    await Risk.findByIdAndDelete(req.params.id);
    res.json({ message: 'Risk deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
