const Margin = require('../models/margin');

exports.getAllMargins = async (req, res) => {
  try {
    const margins = await Margin.find().sort({ updatedAt: -1 });
    res.json(margins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMargin = async (req, res) => {
  const margin = new Margin(req.body);
  try {
    const newMargin = await margin.save();
    res.status(201).json(newMargin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateMargin = async (req, res) => {
  try {
    const margin = await Margin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(margin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteMargin = async (req, res) => {
  try {
    await Margin.findByIdAndDelete(req.params.id);
    res.json({ message: 'Margin record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
