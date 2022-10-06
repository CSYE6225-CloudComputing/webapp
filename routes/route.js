const express = require("express");
const router = express.Router();

//db connection
// const db = require('../utils/connection');


//validation
const {signupValidation, loginValidation} = require('../utils/validation');



//-----Routes-------

//controller connections
const {getHealth, createUser, getUser, updateUser} = require('../controller/user');

// get api health
router.get('/healthz', getHealth)


//creating user 
router.post('/v1/user', signupValidation, createUser);


//getting user
router.get('/v1/user/self', loginValidation, getUser);


//updating user
router.put('/v1/user/self', updateUser)



module.exports = router;
