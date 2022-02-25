/**
 * Module dependencies.
 */
const { Op } = require("sequelize");

/**
 * Module constants.
 *
 * skip_where_params: all listed params are treated as special attributes that are skipped on SQL 'WHERE' clause
 */

const skip_where_params = ['limit', 'offset', 'order', 'orderby', 'attr', 'like', 'no_pict', 'pagination']


/**
 * Module Initialization.
 */

function QueryParams(){
    this.where_params = [];
    this.query = {paranoid: false};
}


/**
 * getQuery: Mount sequelize query object.
 */

QueryParams.prototype.getQuery = function(){
    if(this.where_params.length > 0){
        this.query["where"] = {[Op.and]: this.where_params}
    } else {
        this.query["where"] = this.where_params
    }
    return this.query;
}


/**
 * BuildWhere: Parses HTTP request query params to prepare object to mount WHERE clause.
 */

QueryParams.prototype.BuildWhere = function(params){
    for(const [key, value] of Object.entries(params)){
        if(skip_where_params.indexOf(key.toLowerCase()) < 0 ){
            let where = {};
            if(value){
                where[key] = value
                this.where_params.push(where)
            }
        }
    }
}

/**
 * Limit: Mount SQL 'LIMIT' clause for Sequelize from request HTTP query params.
 */


QueryParams.prototype.Limit = function(params){
    let limit = params["limit"]
    if(limit){
        this.query["limit"] = parseInt(limit);
    }
};


/**
 * Offset: Mount SQL 'OFFSET' clause for Sequelize from request HTTP query params.
 */

QueryParams.prototype.Offset = function(params){
    let offset = params["offset"]
    if(offset){
        this.query["offset"] = parseInt(offset);
    }
};


/**
 * Order: Mount SQL 'ORDER BY' clause for Sequelize from request HTTP query params.
 */

QueryParams.prototype.Order = function(params){
    let orderby = params["orderby"];
    let order = params["order"] || 'ASC';

    if(orderby){
        this.query["order"] = [[orderby, order]];
    }
};


/**
 * FilterByLike: Mount SQL 'LIKE' clause for Sequelize from request HTTP query params.
 */

QueryParams.prototype.FilterByLike = function(params){
    let like = params["like"];
    let attr = params["attr"];

    if(like && attr){
        var q = {};
        q[attr] = { [Op.like]: "%" + like + "%"};
        this.where_params.push(q);
    }
};


var BuildQuery = async function(request){
    var query = new QueryParams();

    if(request.query){
        query.BuildWhere(request.query);
        query.Limit(request.query);
        query.Offset(request.query);
        query.Order(request.query);
        query.Limit(request.query);
        query.FilterByLike(request.query);
    }
    return query.getQuery();
}

module.exports = BuildQuery;
