const ServiceModel = require('../models/service');

class Service {
    static async getStatus(query) {

        if(query && query.service){
            query = {where: {name: query.service}}
        } else {
            query = {}
        }

        var services = await ServiceModel.findAll(query);

        return services;
    }

    static async setStatus(model) {

        var service = await ServiceModel.create(model);

        return service;
    }
}

module.exports = Service;
