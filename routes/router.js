const router = require('express').Router();
const baseAuthentication = require('../utils/auth.js');
const userController = require('../controller/user.js');
const DocumentController = require('../controller/document');
const multer = require('multer');


// -----------User Routes-----------

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



// -----------Document Routes-----------

const upload = multer({ dest: 'uploads/' });


// POST Method  --done
router.post("/v1/documents", baseAuthentication(), upload.single('file'), DocumentController.uploadUserDoc);

// GET Method all
router.get("/v1/documents", baseAuthentication(), DocumentController.getUserDocs);

// Delete Method   --done
router.delete(`/v1/documents/:doc_id`, baseAuthentication(), DocumentController.deleteUserDoc);

// GET Method specific   --done
router.get(`/v1/documents/:doc_id`, baseAuthentication(), DocumentController.getUserDoc);

// GET Method test
router.get(`/test/:doc_id`, function(req, res) {
    res.sendStatus(200).json();
    console.log("-----------------",req.params.doc_id);
});


module.exports = router; 