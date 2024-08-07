const express = require("express");
const env = require("dotenv")
env.config();
const database = require("./config/database");
database.connect();
const app = express();
const port = process.env.PORT;

const routesApiV1 = require("./api/v1/routes/index.route");

routesApiV1(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});