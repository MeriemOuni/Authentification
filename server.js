console.clear();
// Require 
const express = require("express");
require("dotenv").config();
const connectDB = require("./config/connectDB")

// Instance app
const app = express()

// Connection DB
connectDB();

// Routing

// middleware global
app.use(express.json())

// middleware route
app.use("/api/user", require("./router/user"))

// Port
const PORT = process.env.PORT

// Create server
app.listen( PORT, (err) => err 
    ? console.error(err)
    : console.log(`Server is ranning on port ${PORT} ..`)
)