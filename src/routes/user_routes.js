const express = require('express');
const { signup, signin } = require('../controller/userController');
const userRoute = express.Router();


//User Sign Up
userRoute.post("/signup",signup)


//User Sign In
userRoute.post("/signin",signin)



module.exports = userRoute;