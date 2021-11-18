// require 
const express = require("express");
const { signup, signin } = require("../controllers/user");
const isAuth = require("../middleware/isAuth");
const { registerValdidation, validation, loginValidation } = require("../middleware/user");
const router = express.Router();

// route user (signup & signin)

// signup
router.post("/signup",registerValdidation(), validation, signup);

// singin
router.post("/signin",loginValidation(), validation, signin);

// current User
router.get("/current", isAuth, (req, res) => {
    res.send(req.user)
});

// export
module.exports = router;