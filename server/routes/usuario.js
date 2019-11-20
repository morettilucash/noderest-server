const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario')

const app = express();
const bodyParser = require('body-parser');

// parse applicaction/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extend: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/usuario', function (req, res) {
    res.json('Holis');
});

app.post('/usuario', function (req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // Opción para ocultar cuando devuelve el obj despues del post(no recomendada)
        // usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        })
    });
});

app.put('/usuario/:id', function (req, res) {
    let id = req.params.id
    let body = req.body;

    // El parametro new: true, devuelve el objeto modificado
    Usuario.findByIdAndUpdate(id, body, {new: true}, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })
});

app.delete('/usuario', function (req, res) {
    res.json('Holis');
});

module.exports = app;