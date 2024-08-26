const express = require('express');
const { createLeaveVacation, getLeaveVacations } = require('../controllers/leaveController');
const router = express.Router();

router.post('/', createLeaveVacation);
router.get('/', getLeaveVacations);

module.exports = router;
