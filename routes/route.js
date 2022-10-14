const express = require("express");
const router = express.Router();



//validation
const {signupValidation, loginValidation} = require('../utils/validation');



//-----Routes-------

//controller connections
const {getHealth, createUser, getUser, updateUser} = require('../controller/user');

// get api health
router.get('/healthz', getHealth)


//creating user 
router.post('/v1/account', signupValidation, createUser);


//getting user
router.get(`/v1/account/:id`, loginValidation, getUser);

//updating user
router.put(`/v1/account/:id`, updateUser)



module.exports = router;
