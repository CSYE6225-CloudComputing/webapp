const {v4: uuidv4} = require('uuid');
const fs = require('fs');
const _ = require('underscore');
const db = require('../config/sequelizeDB.js');

const User = db.users;
const Document = db.documents;
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
require('dotenv').config()


// Document Upload
const fileUpload = async (source, targetName, s3, fileId, req, res) => {
    fs.readFile(source, async (err, filedata) => {
        if (!err) {

            let updatedAt = Date.now();
            console.log('s3 targetName', targetName)

            var user = await User.findOne({
                where: {
                    username: req.user.username
                }
            });

            var params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: user.user_id + '/' + targetName,
                Body: filedata
            };

            await s3.upload(params, async (err, data) => {
                if (err) {
                    console.log('s3 error', err)
                    res
                        .status(500)
                        .send({message:'500 error' + err});
                        
                } else {
                    const aws_metadata = JSON.parse(JSON.stringify(data));

                    console.log(aws_metadata)
                    var document = {
                        doc_id: uuidv4(),
                        name: targetName,
                        s3_bucket_path: aws_metadata.Location,
                        user_id: user.user_id,

                    };

                    Document
                        .create(document)
                        .then(data => {
                            res
                                .status(201)
                                .send(
                                    {name: data.name, doc_id: data.doc_id, s3_bucket_path: data.s3_bucket_path, user_id: data.user_id}
                                );
                        })
                        .catch(err => {
                            res
                                .status(500)
                                .send({
                                    message: err.message + " Some error occurred while creating the doc!"
                                });
                        });
                }
            });

        } else {
            console.log("error", err)
            res
                .status(500)
                .send({message: "Some error occurred while creating the doc!"});
        }
    });
}



// Document Delete
const deleteFile = async (s3, document) => {

    let s3_start = Date.now();
    console.log('deleteFile')
    let deleted = true;
    const params = {

        Bucket: process.env.AWS_BUCKET_NAME,
        Key: document.user_id + '/' + document.name

    }

    await s3.deleteObject(params, async (err, data) => {

        if (err) {
            console.log('deleteFile err', err)

            deleted = false;
            logger.error(err)

        } else {
            console.log('deleteFile success')

            await Document
                .destroy({
                    where: {
                        doc_id: document.doc_id
                    }
                })
                .then(data => {
                    deleted = true;
                });

        }
    });

    return deleted;
}



module.exports = {
    fileUpload,
    deleteFile
};