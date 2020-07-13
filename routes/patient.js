const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");
const mware = require("../config/middleware")



router.post('/signup',mware.requireLogin,patientController.signup);

router.post('/:id/create_report',mware.requireLogin,patientController.createReport);

router.get('/:id/all_reports',patientController.allReports);


module.exports = router;