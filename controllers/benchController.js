const Bench = require('../models/bench');

exports.getAllBenchResources = async (req, res) => {
  try {
    const benchResources = await Bench.find();
    res.json(benchResources);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBenchResource = async (req, res) => {
  const benchResource = new Bench(req.body);
  try {
    const newBenchResource = await benchResource.save();
    res.status(201).json(newBenchResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getBenchResourceById = async (req, res) => {
  try {
    const benchResource = await Bench.findById(req.params.id);
    if (benchResource == null) {
      return res.status(404).json({ message: 'Cannot find bench resource' });
    }
    res.json(benchResource);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateBenchResource = async (req, res) => {
  try {
    const updatedBenchResource = await Bench.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBenchResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteBenchResource = async (req, res) => {
  try {
    await Bench.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted Bench Resource' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
