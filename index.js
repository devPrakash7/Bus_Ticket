
const express = require("express");
const app = express();
require("./config/database")
const {PORT} = require('./keys/development_key')
const apiRouter = require('./Controller/rout')


//All midddleware
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use("/api" , apiRouter)
// my Port
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
