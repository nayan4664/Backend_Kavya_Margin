const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  primarySkill: { type: String, required: true },
  secondarySkill: { type: String },
  proficiencyLevel: { 
    type: String, 
    enum: ['Expert', 'Advanced', 'Intermediate', 'Beginner'],
    default: 'Intermediate'
  },
  experienceYears: { type: Number, required: true },
  currentProject: { type: String, default: 'None' },
  releaseDate: { type: String, default: 'Immediate' }, // Can be a date or 'Immediate'
  availabilityPercentage: { type: Number, default: 100 },
  allocationPercentage: { type: Number, default: 0 },
  department: { type: String },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', resourceSchema, 'res_resources');
