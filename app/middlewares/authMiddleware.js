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
                    const verifiedtoken = tokenHandler.verify(token);
                    response.locals.token = verifiedtoken;
                    next();
                } catch (error) {
                    error.messageDetail = `Invalid Access token : ${error.message}`,
                    error.message = 'Access denied';
                    error.statusCode = 401;
                    throw error;
                }
            }
        } catch (error) {
            next(error)
        }
    },

};