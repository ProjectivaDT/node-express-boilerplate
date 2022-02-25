(async function() {
	"use strict"
	require('../config');
	const sequelizeLoader = require('../loaders/sequelize');

	await sequelizeLoader();
	const sequelize = require("../helpers/db");

	const ServiceModel = require("../models/service");

	// console.log("Sincronizing models to database");
	await sequelize.sync({force: true});
	await sequelize.query("ALTER TABLE " + process.env.DB_DATABASE + ".Services AUTO_INCREMENT = 1");

	await ServiceModel.create({name: "boilerplate-service", status: "active"})

	console.log("Service Status Created")
	process.exit(0);
})()
