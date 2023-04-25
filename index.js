const config = require('./config');
const databaseLoader = require('./loaders/databaseLoader');

async function startServer(){

  await databaseLoader();
  const app = require("./app");

  app.listen(config.port, err => {
    if (err){
      console.log(err);
      return;
    }
    console.log(`Server is listening on port ${app.get('port')}...`)
  })
}
startServer();
