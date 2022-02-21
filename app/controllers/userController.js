const userDataMapper = require('../dataMappers/userDataMapper');

module.exports = {
    async findAll(_, response, next) {
        try {
            const data = await userDataMapper.findAll();
            response.status(200).json({data});
            return;
        } catch (error) {
            next(error);
        }
    },
    async findById(request, response, next) {
        const { id } = request.params;
        try {
            const data = await userDataMapper.findById(id);
            if (data.length === 0) {
                const error = new Error ('Bad request');
                error.messageDetail = 'Invalid id';
                error.statusCode = 400;
                throw error;
            } else {
                response.status(200).json({data});
            }
        } catch (error) {
            next(error);
        }
        
    },
};
