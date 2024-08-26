const Employee = require('../models/Employee');
const Leave = require('../models/Leave');

// Helper function to get the current date at midnight (start of the day)
const getCurrentDate = () => {
  const now = new Date();
  return new Date(now.setHours(0, 0, 0, 0));
};

exports.getIdExpiryReport = async (req, res) => {
  try {
    const currentDate = getCurrentDate();
    const employees = await Employee.find({
      'status.idPrinting': 'pending', // Optional: Filter by pending status
      idNo: { $exists: true, $ne: '' },
      idPhoto: { $exists: true, $ne: '' },
    }).select('name idNo status.idPrinting');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPassportExpiryReport = async (req, res) => {
  try {
    const currentDate = getCurrentDate();
    const employees = await Employee.find({
      passportExpiry: { $lt: currentDate }
    }).select('name passportNo passportExpiry');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMedicalExpiryReport = async (req, res) => {
  try {
    const currentDate = getCurrentDate();
    const employees = await Employee.find({
      medicalExpiry: { $lt: currentDate },
      'status.medical': 'pending', // Optional: Filter by pending status
    }).select('name medicalExpiry status.medical');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVacationReport = async (req, res) => {
  try {
    const leaves = await Leave.find().populate('employee', 'name designation workingBranch');
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBranchWiseReport = async (req, res) => {
  try {
    const employees = await Employee.aggregate([
      { $group: { _id: "$workingBranch", count: { $sum: 1 } } }
    ]);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDesignationWiseReport = async (req, res) => {
  try {
    const employees = await Employee.aggregate([
      { $group: { _id: "$designation", count: { $sum: 1 } } }
    ]);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGatePassReport = async (req, res) => {
  try {
    const currentDate = getCurrentDate();
    const employees = await Employee.find({
      gatePassExpiry: { $lt: currentDate }
    }).select('name gatePassExpiry');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
