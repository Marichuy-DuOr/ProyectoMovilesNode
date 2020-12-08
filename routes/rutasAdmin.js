const express = require('express');
const connection = require("../conexion");
const user = require('../model/user');
var router = express.Router();

const middlewareRol = require('./middleware_roles');

const { body, param, validationResult } = require('express-validator');

router.use(middlewareRol.checkRole);

router.get('/admin', (req, res) => {
    res.send('Holis Admin!!!!!! :DDD');
});


router.delete('/pelicula/:id', [
    param('id').not().isEmpty().isNumeric()
], (req, res) => {
    const errors = validationResult(req);
    let params = req.params;
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    user.deleteMovie(connection, params, (data => {
        res.json(data);
    }))
});



router.put('/pelicula', [], (req, res) => {
    let body = req.body;
    user.updateMovie(connection, body, (data => {
        res.json(data);
    }))
});

router.get('/pelicula/:id', [
    param('id').not().isEmpty().isNumeric(),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ success: false, err: JSON.stringify(errors) })
        return
    }
    let id = req.params.id;
    user.getIdMovie(connection, id, (data => {
        res.json(data);
    }))
});

router.post('/pelicula', (req, res) => {
    let body = req.body;
    user.createMovie(connection, body, (data => {
        res.json(data);
    }));
});

module.exports = router;