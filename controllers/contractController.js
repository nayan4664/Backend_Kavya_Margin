const Contract = require('../models/contract');

exports.getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.find();
    res.json(contracts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createContract = async (req, res) => {
  const contract = new Contract(req.body);
  try {
    const newContract = await contract.save();
    res.status(201).json(newContract);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getContractById = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (contract == null) {
      return res.status(404).json({ message: 'Cannot find contract' });
    }
    res.json(contract);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.updateContract = async (req, res) => {
  try {
    const updatedContract = await Contract.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedContract);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteContract = async (req, res) => {
  try {
    await Contract.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted Contract' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
