const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  leaveStartDate: { type: Date, required: true },
  leaveEndDate: { type: Date, required: true },
  leaveDays: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Leave', LeaveSchema);