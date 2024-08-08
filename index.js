const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const env = require("dotenv");
env.config();
const database = require("./config/database");
database.connect();
const app = express();
const port = process.env.PORT;

app.use(cors());

const routesApiV1 = require("./api/v1/routes/index.route");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

// parse application/json
app.use(bodyParser.json());

// Routes Version 1
routesApiV1(app);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
