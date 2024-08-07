const express = require("express");
const bodyParser = require("body-parser")
const env = require("dotenv")
env.config();
const database = require("./config/database");
database.connect();
const app = express();
const port = process.env.PORT;

const routesApiV1 = require("./api/v1/routes/index.route");

// parse application/json
app.use(bodyParser.json());

// Routes Version 1
routesApiV1(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});