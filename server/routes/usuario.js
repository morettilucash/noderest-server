const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario')
const { verificarToken, verificarRolAdmin } = require('../middlewares/autenticacion');

const app = express();
const bodyParser = require('body-parser');

// parse applicaction/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extend: false }));

// parse application/json
app.use(bodyParser.json());


/// Rutas
app.get('/usuario/all/', verificarToken, function (req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

     // son los campos que se van a retornar, los demas se omiten.
     // y busca solo los que estan activos
    Usuario.find( { },'nombre email role estado google img') 
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            // Cuenta solo los que estan activos 
            Usuario.count({ }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    total: conteo
                })
            })
        })
});

app.get('/usuario', verificarToken, function (req, res) {

    // return res.json({
    //     usuario: req.usuario,
    //     nombre: req.usuario.nombre,
    //     email: req.usuario.email
    // });

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 10;
    limite = Number(limite);

     // son los campos que se van a retornar, los demas se omiten.
     // y busca solo los que estan activos
    Usuario.find({ estado: true }, 'nombre email role estado google img') 
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }
            // Cuenta solo los que estan activos 
            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    total: conteo
                })
            })
        })
});

app.post('/usuario', [verificarToken, verificarRolAdmin], function (req, res) {

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

app.put('/usuario/:id', verificarToken, function (req, res) {
    let id = req.params.id
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    // El parametro new: true, devuelve el objeto modificado
    // El parametro runValidators: true permite que se respeten las validaciones desde el model
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

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

app.delete('/usuario/:id', verificarToken, function (req, res) {

    let id = req.params.id;
    let e = { estado: false };

    // El parametro new: true, devuelve el objeto modificado
    // El parametro runValidators: true permite que se respeten las validaciones desde el model
    Usuario.findByIdAndUpdate(id, e, { new: true }, (err, usrBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usrBorrado
        });
    })

    // ==========================================
    // Eliminar registro:
    // Usuario.findByIdAndRemove(id, (err, usrBorrado) => {
    // if(err) {
    //     return res.status(400).json({
    //         ok: false,
    //         err
    //     });
    // }
    // if(!usrBorrado) {
    //     return res.status(400).json({
    //         ok: false,
    //         err: {
    //             message: 'Usuario no encontrado'
    //         }
    //     });
    // }
    //     res.json({
    //         ok: true,
    //         usuario: usrBorrado
    //     });
    // });
    // ==========================================

});

module.exports = app;