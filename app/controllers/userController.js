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
                response.status(400).json({
                    message: 'Bad request',
                    detail: 'Invalid id'
                });
                return;
            }
            response.status(200).json({data});
            return;
        } catch (error) {
            next(error);
        }
        
    },
};
