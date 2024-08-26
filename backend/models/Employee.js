const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  slNo: { type: String, required: true, unique: true },
  fileNo: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  nation: { type: String, required: true },
  passportNo: { type: String, required: true, unique: true },
  passportExpiry: { type: Date },
  designation: { type: String, required: true },
  idNo: { type: String, required: true, unique: true },
  idPhoto: { type: String },
  visaExpiry: { type: Date },
  medicalExpiry: { type: Date },
  medicalPhoto: { type: String },
  gatePassExpiry: { type: Date },
  gatePassPhoto: { type: String },
  workingBranch: { type: String, required: true },
  joinDate: { type: Date, required: true },
  arrivedDate: { type: Date },
  contact: { type: String },
  homeAddress: { type: String },
  contract: { type: String },
  status: {
    vpNumber: { type: String },
    visaNumber: { type: String },
    medical: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    visaPrinting: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    idPrinting: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    foodMedical: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  },
  profilePhoto: { type: String }, 
  passportPhoto: { type: String }, 
});

module.exports = mongoose.model('Employee', EmployeeSchema);
