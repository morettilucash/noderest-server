const jwt = require('jsonwebtoken')

let verificarToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido.'
                }
            });
        }
        // decoded: contiene el payload del token.
        // acceso a la informacion una vez pasado por verificar token:
        req.usuario = decoded.usuario;

        next(); // Sigue la ejecucion de la funcion en usuario.js
    });
}

let verificarRolAdmin = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'No tiene permisos para este recurso.'
            }
        });
    }
}


module.exports = {
    verificarToken,
    verificarRolAdmin
}