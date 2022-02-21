const authDataMapper = require('../dataMappers/authDataMapper');
const argon2 = require('argon2');
const tokenHandler = require('../services/tokenHandler');

module.exports = {

    async signup(request, response, next) {
        const { name, email, password } = request.body;
        try {
            const userFound = await authDataMapper.findUserByEmail(email);
            if (userFound) {
                const error = new Error ('Registration failed');
                error.messageDetail = 'Email already in use';
                error.statusCode = 400;
                throw error;
            } else {
                const hashPassword = await argon2.hash(password);
                const user = await authDataMapper.createUser(name, email, hashPassword);
                user.token = tokenHandler.generate(user);
                response.status(201).json({
                    message: "Registration succed",
                    created_user: user
                });
                return;
            }
        } catch (error) {
            next(error);
        }        
    },

    async signin(request, response, next) {
        const { email, password } = request.body;
        try {
            const user = await authDataMapper.findUserByEmail(email);
            if (!user) {
                const error = new Error ('Authentication failed');
                error.messageDetail = 'Invalid email';
                error.statusCode = 401;
                throw error;
            }
            else if (await argon2.verify(user.password, password)) {
                user.token = tokenHandler.generate(user);
                response.status(200).json({
                    message: "Authentication succed",    
                    connected_user: user
                });
            } else {
                const error = new Error ('Authentication failed');
                error.messageDetail = 'Invalid password';
                error.statusCode = 401;
                throw error;
            }
        } catch (error) {
            next(error);
        }
    },
};