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
    user.getAllCarrito(connection, body, (data => {
        res.json(data);
    }))
});

router.put('/carrito', [], (req, res) => {
    let body = req.body;
    user.updateCarrito(connection, body, (data => {
        res.json(data);
    }))
});

router.delete('/carrito/:id', [
    param('id').not().isEmpty().isNumeric()
], (req, res) => {
    const errors = validationResult(req);
    let params = req.params;
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    user.deleteCarrito(connection, params, (data => {
        res.json(data);
    }))
});

router.delete('/carrito', [], (req, res) => {
    let body = req.body;
    body.id = req.idUsuario;
    user.deleteAllCarrito(connection, body, (data => {
        res.json(data);
    }))
});

router.post('/pedido', (req, res) => {
    let body = req.body;
    body.id = req.idUsuario;

    user.createPedido(connection, body, (data => {
        res.json(data);
    }));
});

router.post('/pedidoProducto', (req, res) => {
    let body = req.body;

    user.createProductoPedido(connection, body, (data => {
        res.json(data);
    }));
});
module.exports = router;