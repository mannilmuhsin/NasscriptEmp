const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/', employeeController.createEmployee);
router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployees);
router.put('/:id', employeeController.updateEmployee);

// Add more routes as needed

module.exports = router;