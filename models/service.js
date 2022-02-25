
/**
 * Model dependencies.
 */

'use strict';
const {DataTypes, Model} = require('sequelize');
const sequelize = require('../helpers/db');

/**
 * Model definitions.
 */

class Service extends Model {}

Service.init({
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status:{
  	type: DataTypes.STRING,
    allowNull: false
  }
},{
  sequelize,
  modelName:'service',
  tableName: 'Services',
  timestamps: false
})

module.exports = Service;
