const express = require("express");
const app = express();
const validator = require('validator');
require("./db/mongoose");
const chalk = require('chalk');

const User = require("./models/user");
const Task = require("./models/task");
const userrouter = require("./routers/users");
const taskrouter = require("./routers/task");

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(userrouter);
app.use(taskrouter);

app.listen(port, () => {
    console.log("Server is running in port ", port);
});



//https://www.getpostman.com/collections/ce82a60acd7851813f07