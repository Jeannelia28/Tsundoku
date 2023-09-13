const Server = require('./models/server');
const initDB = require('./database/connection')

const server = new Server();
server.listen();
initDB()