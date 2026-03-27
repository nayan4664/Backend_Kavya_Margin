const Revenue = require('../models/revenue');

exports.getAllRevenue = async (req, res) => {
  try {
    const revenue = await Revenue.find();
    res.json(revenue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createRevenue = async (req, res) => {
  const revenue = new Revenue(req.body);
  try {
    const newRevenue = await revenue.save();
    res.status(201).json(newRevenue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getRevenueById = async (req, res) => {
  try {
    const revenue = await Revenue.findById(req.params.id);
    if (revenue == null) {
      return res.status(404).json({ message: 'Cannot find revenue' });
    }
    res.json(revenue);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateRevenue = async (req, res) => {
  try {
    const updatedRevenue = await Revenue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRevenue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteRevenue = async (req, res) => {
  try {
    await Revenue.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted Revenue' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
