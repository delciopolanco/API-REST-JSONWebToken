const mongoose = require('mongoose'),
    User = require('../models/user'),
    service = require('../services');

function singUp(req, res) {
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    });

    user.avatar = user.gravatar();

    user.save((err) => {
        if (err) {
            res.status(500).send({
                message: `Error al crear el usuario: ${err}`
            });
        }

        return res.status(200).send({
            token: service.createToken(user)
        });
    });
}

function singIn(req, res) {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) {
            return res.status(500).send({
                message: err
            });
        }
        if (!user || user.length === 0) {
            return res.status(404).send({
                message: 'No existe el usuario'
            });
        }

        return user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) {
                return res.status(500).send({
                    msg: `Error al ingresar: ${err}`
                });
            }
            if (!isMatch) {
                return res.status(404).send({
                    msg: `Error de contraseña: ${req.body.email}`
                });
            }

            req.user = user;
            return res.status(200).send({
                msg: 'Te has logueado correctamente',
                token: service.createToken(user)
            });
        });

    });

}

module.exports = {
    singIn,
    singUp
};