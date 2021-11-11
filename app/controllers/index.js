const dataMapper = require('../dataMappers');

module.exports = {
    async findAll(_, response, next) {
        try {
            const data = await dataMapper.findAll();
            response.status(200).json({data});
        } catch (error) {
            next(error);
        }
    },
    async findById(request, response, next) {
        const { id } = request.params;
        try {
            const data = await dataMapper.findById(id);
            if (data.length === 0) {
                response.status(400).json({
                    message: 'Bad request',
                    detail: 'Invalid id'
                })
            }
            response.status(200).json({data});
        } catch (error) {
            next(error);
        }
        
    },
};
