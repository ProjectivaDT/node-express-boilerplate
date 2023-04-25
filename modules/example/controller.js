/**
 * Controler dependencies.
 */
const ExampleService = require('./service');
const Logger = require('../../helpers/logger');

/**
 * Controller Methods.
 */

class ExampleCtrl {
    static async getall(req, res, next) {
        try{
            Logger.debug("ExampleController: Get Status: Query -- ", req.query);
            const status = await ExampleService.getall(req.query);
            res.json(status)
        } catch(err) {
            Logger.warn("ExampleController: Get Status: Catch Error -- ", err)
            next(err);
        }
    }

    static async create(req, res, next) {
        try{
            Logger.debug("ExampleController: Set Status: Body -- ", req.body);
            const status = await ExampleService.create(req.body);
            res.json(status)
        } catch(err) {
            Logger.warn("ExampleController: Set Status: Catch Error -- ", err)
            next(err);
        }
    }
}

module.exports = ExampleCtrl;
