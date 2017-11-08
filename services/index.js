const jwt = require('jwt-simple'),
    moment = require('moment'),
    config = require('../config');

function createToken(user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix(),
    };

    return jwt.encode(payload, config.SECRET_TOKEN);
}

function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN);

            if (payload.exp <= moment.unix()) {
                return resolve({
                    status: 401,
                    message: 'El token ha expirado'
                });
            }

            resolve(payload.sub);

        } catch (error) {
            reject({
                status: 500,
                message: 'Invalid token'
            });
        }
    });

    return decoded;
}

module.exports = {
    createToken,
    decodeToken
};