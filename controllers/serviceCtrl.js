/**
 * Controler dependencies.
 */
const Service = require('../services/service');
const logger = require('../helpers/logger');


/**
 * Controller Methods.
 */


class ServiceStatusCtrl {
    static async getStatus(req, res, next) {
        try{
            logger.debug("ServicesController: Get Status: Query -- ", req.query);
            const status = await Service.getStatus(req.query);
            res.json(status)
        } catch(err) {
            logger.warn("ServicesController: Get Status: Catch Error -- ", err)
            next(err);
        }
    }

    static async setStatus(req, res, next) {
        try{
            logger.debug("ServicesController: Set Status: Body -- ", req.body);
            const status = await Service.setStatus(req.body);
            res.json(status)
        } catch(err) {
            logger.warn("ServicesController: Set Status: Catch Error -- ", err)
            next(err);
        }
    }
}


module.exports = ServiceStatusCtrl;
