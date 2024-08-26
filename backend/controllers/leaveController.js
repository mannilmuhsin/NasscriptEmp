const LeaveVacation = require('../models/Leave');

exports.createLeaveVacation = async (req, res) => {
  try {
    const leaveVacation = new LeaveVacation(req.body);
    await leaveVacation.save();
    res.status(201).json(leaveVacation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getLeaveVacations = async (req, res) => {
    try {
      const leaveVacations = await LeaveVacation.find().populate('employee'); // Populate employee details
      res.status(200).json(leaveVacations);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
