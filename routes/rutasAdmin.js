const express = require('express');
const connection = require("../conexion");
const user = require('../model/user');
var router = express.Router();

const middlewareRol = require('./middleware_roles');

const { body, param, validationResult } = require('express-validator');

router.use(middlewareRol.checkRole);


router.delete('/producto/:id', [
    param('id').not().isEmpty().isNumeric()
], (req, res) => {
    const errors = validationResult(req);
    let params = req.params;
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    user.deleteProducto(connection, params, (data => {
        res.json(data);
    }))
});

router.put('/producto', [], (req, res) => {
    let body = req.body;
    user.updateProducto(connection, body, (data => {
        res.json(data);
    }))
});

router.post('/producto', (req, res) => {
    let body = req.body;
    user.createProducto(connection, body, (data => {
        res.json(data);
    }));
});

router.get('/pedidosActivos/:estado', [
    param('estado').not().isEmpty().isNumeric(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let estado = req.params.estado;
    user.getPedidosActivos(connection, estado, (data => {
        res.json(data);
    }))
});

router.get('/detalles/:id', [
    param('id').not().isEmpty().isNumeric(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let id = req.params.id;
    user.getDetallesPedidos(connection, id, (data => {
        res.json(data);
    }))
});

router.put('/completarPedido', [], (req, res) => {
    let id = req.body.id;
    user.completarPedido(connection, id, (data => {
        res.json(data);
    }))
});


module.exports = router;