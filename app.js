const express = require("express");
const userRouters = require('./routes/user')
const initDB = require('./database/connection')

const app = express();
const port = 3008;

app.use(userRouters)

app.listen(port, ()=>{
    console.log("server running on port", port);
});

initDB()