const db = require('../config/sequelizeDB.js');
const bcrypt = require('bcryptjs');
const {v4: uuidv4} = require('uuid');
const multer = require('multer');
const path = require('path');
const fileService = require('../Service/file');
const AWS = require('aws-sdk');
const fs = require('fs')

const User = db.users;
const Document = db.documents;

//Creating a new instance of S3:
AWS
    .config
    .update({region: process.env.AWS_BUCKET_REGION});

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});



//get user
async function getUserByUsername(username) {
    return User.findOne({
        where: {
            username: username
        }
    });
}


// // get doc_id
async function getDocumentByDocId(doc_id) {
    return Document.findOne({
        where: {
            doc_id: doc_id
        }
    });
}


// Upload Document
async function uploadUserDoc(req, res, next) {

    const user = await getUserByUsername(req.user.username);

    console.log('=========================duplicate-check===================================')

    console.log(req.file)
    
    var documentCheck = await Document.findAll({
        where: {
            name: req.file.originalname
        }
    });

    if (documentCheck == 0){
        console.log('true')
    }else{
        console.log('false')
    }

    console.log('=========================response===================================')

    if (!req.file) {
        res
            .status(400)
            .send({message: 'No File Uploaded!'});
        console.log("No File Uploaded..!");
    }

    const filetypes = /pdf|doc/;
    const extname = filetypes.test(
        path.extname(req.file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(req.file.mimetype);


    if (!mimetype && !extname) {

        res
            .status(400)
            .send({message: 'Unsupported File Type'});
        console.log("Unsupported File Format..!");

    } else if (documentCheck == 0){

        const fileId = uuidv4();

        const fileName = path.basename(req.file.originalname, path.extname(req.file.originalname)) + path.extname(req.file.originalname);
        console.log('fileName: ', fileName)

        await fileService.fileUpload(req.file.path, fileName, s3, fileId, req, res);

    } else {
        res
            .status(409)
            .send({message: 'Document with same name exists'});
        console.log('Document with same name exists')

    }

    console.log('============================================================')


}


// Get specific Document
async function getUserDoc(req, res, next) {

    console.log("in file ----------- get specific document ----------")

    const user = await getUserByUsername(req.user.username);
    console.log(req.user.username)

    var doc = req.params.doc_id
    console.log(doc)

    // console.log(await Document.findOne({
    //     where: {
    //         user_id: user.user_id,
    //         doc_id: doc
    //     }
    // }))
    
    console.log(req.params.doc_id)

    var document = await Document.findOne({
        where: {
            user_id: user.user_id,
            doc_id: doc
        }
    });

    if (document) {
        res.status(200).send({
            name: document.name,
            doc_id: document.doc_id,
            s3_bucket_path: document.s3_bucket_path,
            updatedAt: document.updatedAt,
            user_id: document.user_id
        });
    } else {
        res.status(404).send({
            message: 'No Document found!'
        });
    }
}

// Get all Documents
async function getUserDocs(req, res, next) {

    console.log("in file ----------- get all documents ----------")

    const user = await getUserByUsername(req.user.username);

    var document = await Document.findAll({
        where: {
            user_id: user.user_id
        }
    });

    console.log(document);

    if (document) {
        res.status(200)
        .send(document);
        
    } else {
        res.status(404).send({
            message: 'No Document avaliable!'
        });
    }
}



// Delete Document
async function deleteUserDoc(req, res, next) {

    console.log("in file ----------- delete specific document ----------")


    const user = await getUserByUsername(req.user.username);

    console.log(req.user.username)

    var doc = req.params.doc_id
    console.log(doc)

    var document = await Document.findOne({
        where: {
            user_id: user.user_id,
            doc_id: doc
        }
    });

    if (document) {
        console.log('delete doc', document);
        var del = await fileService.deleteFile(s3, document);
        if (del) {
            res.status(200).send('')
        } else {
            res.status(404).send({
                message: 'error deleting'
            });
        }

    } else {
        res.status(404).send({
            message: 'No document found!'
        });
    }
}


module.exports = {

    uploadUserDoc: uploadUserDoc,
    getUserDoc: getUserDoc,
    getUserDocs: getUserDocs,
    deleteUserDoc: deleteUserDoc
};