const tokenHandler = require('../services/tokenHandler');

module.exports = {

    async verifyToken(request, response, next) {
        try {
            const token = request.headers["x-access-token"];
            if (!token) {
                const error = new Error ('Access denied');
                error.messageDetail = 'Access token is required';
                error.statusCode = 403;
                throw error;
            } else {
                try {
                    tokenHandler.verify(token);
                    next();
                } catch (error) {
                    error.message = 'Access denied';
                    error.messageDetail = 'Invalid Access token';
                    error.statusCode = 401;
                    throw error;
                }
            }
        } catch (error) {
            next(error)
        }
    },

};