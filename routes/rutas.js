const express = require('express');
const connection = require("../conexion");
const user = require('../model/user');
var router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const moment = require('moment');

const { body, param, validationResult } = require('express-validator');

const crearToken = (user) => {
    let payload = {
        idUser: user.id,
        role: user.role,
        createdAt: moment().unix(),
        expiresAt: moment().add(1, 'day').unix()
    }
    return jwt.encode(payload, process.env.TOKEN_KEY);
};

router.post('/login', (req, res) => {
    let email = req.body.email;
    user.getbyemail(connection, email, (data => {

        if (data.id.length === 0) {
            return res.status(400).json({ message: 'Username or Password are incorrect!' });
        } else {
            const equals = bcrypt.compareSync(req.body.password, data.id[0].password);
            if (!equals) {
                return res.status(400).json({ message: 'Username or Password are incorrect!' });
            } else {
                res.json({
                    /*succesfull: crearToken(data.id[0]),
                    done: 'Login correct'*/
                    message: 'OK',
                    token: crearToken(data.id[0]),
                    userId: data.id[0].id,
                    role: data.id[0].role,
                    name: data.id[0].name
                })
            }
        }
    }));

});

router.post('/register', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    let body = req.body;
    user.create(connection, body, (data => {
        res.json(data);
    }));
});

module.exports = router;