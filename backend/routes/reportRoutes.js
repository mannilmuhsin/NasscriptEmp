const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/idExpiry', reportController.getIdExpiryReport);
router.get('/passportExpiry', reportController.getPassportExpiryReport);
router.get('/medicalExpiry', reportController.getMedicalExpiryReport);
router.get('/vacation', reportController.getVacationReport);
router.get('/branchWise', reportController.getBranchWiseReport);
router.get('/designationWise', reportController.getDesignationWiseReport);
router.get('/gatePass', reportController.getGatePassReport);

module.exports = router;