const config = require('./config');
const loaders = require('./loaders');
const express = require('express');
const app = express();

async function startServer(){
 await loaders({expressApp: app});
  app.listen(config.port, err => {
    if (err){
      console.log(err);
      return;
    }
    console.log(`Server is listening on port ${app.get('port')}...`)
  })
}
startServer();

module.exports = app
