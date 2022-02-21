/**
 * Variables d'environnement
 ** JWT_SECRET='le #F0F c'est la cie !' // clé du token
 ** JWT_TIME_LIMIT='1h' // Durée de validité du token, ici 1 heure ('1d': 1 jour)
 */

const jsonwebtoken = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const secureByToken = {

    generate(user, limit) {

        if (!user.role) user.role = 1;

        if (!limit) limit = process.env.JWT_TIME_LIMIT;

        const token = jsonwebtoken.sign(
            {
                id: user.id,
                role: user.role
            },
            secret,
            {
                expiresIn: limit
            }
        );
        return token;
    },

    verify(token) {
        return jsonwebtoken.verify(token, secret, (error, decoded) => {
            if (error) throw (error);
            return decoded;
        });
    },

};

module.exports = secureByToken;