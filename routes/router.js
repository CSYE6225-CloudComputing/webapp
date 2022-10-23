const router = require('express').Router();
const baseAuthentication = require('../utils/auth.js');
const userController = require('../controller/user.js');

// GET Method

router.get("/healthz", (req, res) => {
    console.log("Is it hitting?")
    res.sendStatus(200).json();
});

// POST Method

router.post(`/v1/account`, userController.createUser);

// GET Method (With Authentication)

router.get(`/v1/account/:id`, baseAuthentication() , userController.getUser);

// PUT Method

router.put(`/v1/account/:id`, baseAuthentication() , userController.updateUser);

module.exports = router; 