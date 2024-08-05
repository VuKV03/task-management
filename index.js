const express = require("express");
const database = require("./config/database");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

database.connect();

const Task = require("./models/task.model");

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find({
    deleted: false,
  });

  console.log(tasks);

  res.send("Danh sách công việc");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})