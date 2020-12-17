const express = require('express');
const connection = require("../conexion");
const user = require('../model/user');
var router = express.Router();

const middleware = require('./middleware')

const { body, param, validationResult } = require('express-validator');

router.use(middleware.checkToken);

router.post('/carrito', (req, res) => {
    let body = req.body;
    body.id_usuario = req.idUsuario;
    user.createCarrito(connection, body, (data => {
        res.json(data);
    }));
});

router.get('/carrito', [], (req, res) => {
    let body = req.body;
    body.id = req.idUsuario;
    user.getAllCarrito(connection,  body, (data => {
        res.json(data);
    }))
});

router.put('/carrito', [], (req, res) => {
    let body = req.body;
    user.updateCarrito(connection, body, (data => {
        res.json(data);
    }))
});

module.exports = router;