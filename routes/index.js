// import express
const express = require("express");

//get express router
const router = express.Router();

// import patient_controller
const patientController = require("../controllers/patientController");


// handles route for landing page
router.get('/reports/:status',patientController.allReportsbyStatus);


//include doctor routes
router.use('/doctor',require("./doctor"));

//include patient routes
router.use('/patient',require("./patient"));






console.log("router loaded");

// exporting router
module.exports = router;
