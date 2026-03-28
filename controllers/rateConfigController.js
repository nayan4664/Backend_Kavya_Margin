const RateConfig = require('../models/rateConfig');

exports.getRateConfigs = async (req, res) => {
  try {
    const rates = await RateConfig.find();
    res.json(rates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createRateConfig = async (req, res) => {
  const rate = new RateConfig(req.body);
  try {
    const newRate = await rate.save();
    res.status(201).json(newRate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateRateConfig = async (req, res) => {
  try {
    const updatedRate = await RateConfig.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteRateConfig = async (req, res) => {
  try {
    await RateConfig.findByIdAndDelete(req.params.id);
    res.json({ message: 'Rate configuration deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
