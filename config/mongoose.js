
// import mongoose
const mongoose = require("mongoose");

// send connection request to db
mongoose.connect("mongodb://localhost/hospital_db");

// get connection object
const db = mongoose.connection;

db.on("error",console.error.bind(console,"error connection to db"));

db.once('open',function(){
    console.log("db connected successfully");
})

//export connection object
module.exports = db;

