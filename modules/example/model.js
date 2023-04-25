
/**
 * Model dependencies.
 */

'use strict';
const {DataTypes, Model} = require('sequelize');
const db = require('../../helpers/db');

/**
 * Model definitions.
 */

class Example extends Model {}

Example.init({
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
  sequelize: db,
  modelName:'example',
  tableName: 'Example',
  timestamps: false
})

module.exports = Example;
