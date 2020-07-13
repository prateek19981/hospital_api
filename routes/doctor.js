const express = require("express");
const router = express.Router();
const doctorController= require("../controllers/doctorController");



router.post('/signup',doctorController.signup);

router.post('/signin',doctorController.signin);



module.exports = router;