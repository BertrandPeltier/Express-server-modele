module.exports = {
    async isAdmin(_, response, next) {
        try {
            const userIsAdmin = response.locals.token.role === 1
            if (userIsAdmin) {
                next();
            } else {
                const error = new Error ('Access denied');
                error.messageDetail = 'Not allowed to access this URI';
                error.statusCode = 403;
                throw error;
            } 
        } catch (error) {
            next(error);
        }
    },
}
