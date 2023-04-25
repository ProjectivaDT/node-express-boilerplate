const ExampleModel = require('./model');

class ExampleService {
    static async getall(query) {

        if(query && query.service){
            query = {where: {name: query.service}}
        } else {
            query = {}
        }

        var services = await ExampleModel.findAll(query);

        return services;
    }

    static async create(model) {

        var service = await ExampleModel.create(model);

        return service;
    }
}

module.exports = ExampleService;
