//db connection
const db = require('../utils/connection');


//validation
const {signupValidation, loginValidation} = require('../utils/validation');



const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {v4: uuidv4} = require("uuid");
const moment = require('moment');
const auth = require('basic-auth');


//get main
const getHealth = (req, res) => {
    res.send('')
}


// create user
const createUser = (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE LOWER(username) = LOWER(${db.escape(req.body.username)});`,
        (err, result) => {
            if (result.length) {
                return res
                    .status(400)
                    .send({msg: 'This user is already in use!'});
            } else {
                // username is available
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res
                            .status(500)
                            .send({msg: err});
                    } else {
                        // has hashed pw => add to database
                        db.query(
                            `INSERT INTO users (id,first_name, last_name, username, password,account_created) VALUES ('${uuidv4()}','${req.body.first_name}','${req.body.last_name}', ${db.escape(req.body.username)}, ${db.escape(hash)},'${moment(new Date()).format('YYYY-MM-DD hh:mm:ss')}')`,
                            (err, result) => {
                                if (err) {
                                    throw err;
                                    return res
                                        .status(400)
                                        .send({msg: err});
                                }
                                return res
                                    .status(201)
                                    .send({msg: 'The user has been registerd with us!'});
                            }
                        );
                    }
                });
            }
        }
    );
}


// get user information
const getUser = (req, res, next) => {
    db.query(
        `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
        (err, result) => {
            // user does not exists
            if (err) {
                throw err;
                return res
                    .status(400)
                    .send({msg: err});
            }
            if (!result.length) {
                return res
                    .status(401)
                    .send({msg: 'Email or password is incorrect!'});
            }
            // check password
            bcrypt.compare(req.body.password, result[0]['password'], (bErr, bResult) => {
                // wrong password
                if (bErr) {
                    throw bErr;
                    return res
                        .status(401)
                        .send({msg: 'Email or password is incorrect!'});
                }
                if (bResult) {
                    const token = jwt.sign({
                        id: result[0].id
                    }, 'the-super-strong-secrect', {expiresIn: '1h'});
                    // db.query(   `UPDATE users SET last_login = now() WHERE id =
                    // '${result[0].id}'` );
                    
                    return res
                        .status(200)
                        .send({msg: 'Logged in!', username: result[0].username, firstname: result[0].first_name, lastname: result[0].last_name, username: result[0].username});
    
                }
                return res
                    .status(401)
                    .send({msg: 'Username or password is incorrect!'});
            });
        }
    );
}


const updateUser = (req, res, next) => {

    const user = auth(req);

    if(!req.body.username && !req.body.account_updated && !req.body.account_created){

        db.query(
            // `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
            'SELECT * FROM users where username=?',
            user.name,
            (err, result) => {
                // user does not exists
                if (err) {
                    throw err;
                    // return res
                    //     .status(400)
                    //     .send({msg: err});
                }
                if (result.length != 0) {
                    // return res
                    //     .status(401)
                    //     .send({msg: 'Email or password is incorrect!'});
                
                    // check password
                    // bcrypt.compare(req.body.password, result[0]['password'], (bErr, bResult) => {
                    bcrypt.compare(user.pass, result[0]['password'], (bErr, bResult) => {

                        // wrong password
                        if (bErr) {
                            throw bErr;
                            return res
                                .status(401)
                                .send({msg: 'Email or password is incorrect!22'});
                        }
                        if (bResult) {
                            const token = jwt.sign({
                                id: result[0].id
                            }, 'the-super-strong-secrect', {expiresIn: '1h'});

                            bcrypt.hash(req.body.password, 10, (err, hash) => {
                                    if (err) {
                                        return res
                                            .status(500)
                                            .send({msg: err});
                                    } else {
                                        // has hashed pw => add to database
                                        db.query(` UPDATE users SET 
                                        first_name = '${req.body.first_name}',
                                        last_name = '${req.body.last_name}', 
                                        password = '${hash}',
                                        account_updated = '${moment(new Date()).format('YYYY-MM-DD hh:mm:ss')}' 
                                        WHERE username = ${db.escape(req.body.username)} `,
                                            (err, result) => {
                                                if (err) {
                                                    throw err;
                                                    return res
                                                        .status(400)
                                                        .send("");
                                                } else {
                                                    return res
                                                        .status(204)
                                                        .send({msg :"Updated"});
                                                }
                                            }
                                        );

                                    }
                                });
                            // return res
                            //     .status(200)
                            //     .send({msg: 'Logged in!', token, user: result[0]});
                        }else {
                            res
                                .status(401)
                                .send('Incorrect Password!');
                        }
                    });
                }else{
                    return res
                        .status(401)
                        .send('Username is incorrect!');
                }
            }
            
        );
    }else{
        return res
            .status(400)
            .send({msg:'cannot update username'});
    }   
}

module.exports ={getHealth, createUser, getUser, updateUser}