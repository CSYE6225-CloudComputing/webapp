const router = require('express').Router();
const baseAuthentication = require('../utils/auth.js');
const userController = require('../controller/user.js');
const DocumentController = require('../controller/document');
const multer = require('multer');
const logger = require("../config/logger");

const dbConfig = require('../config/configDB.js');
const SDC = require('statsd-client');
const sdc = new SDC({host: dbConfig.METRICS_HOSTNAME, port: dbConfig.METRICS_PORT});
var start = new Date();


// new
const { S3Client } = require('@aws-sdk/client-s3')
const multerS3 = require('multer-s3')
const env = process.env || 'initial';

// new end


// -----------User Routes-----------

// GET Method
router.get("/healthz", (req, res) => {
    console.log("Is it hitting?")
    sdc.timing('health.timeout', start);
    logger.info("/health running fine");
    sdc.increment('endpoint.health');
    res.sendStatus(200).json();
});

// POST Method
router.post(`/v1/account`, userController.createUser);

// GET Method (With Authentication)
router.get(`/v1/account/:user_id`, baseAuthentication() , userController.getUser);

// PUT Method
router.put(`/v1/account/:user_id`, baseAuthentication() , userController.updateUser);

// Verify User
router.get("/v1/verifyUserEmail", userController.verifyUser);



// -----------Document Routes-----------

// const fileStorage = multer.diskStorage({
//     // Destination to store image     
//     destination: 'fileUpload'
// });

// const upload = multer({
//     storage: fileStorage 
// }) 

// const upload = multer({ dest: 'uploads/' });



const s3 = new S3Client()
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})



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