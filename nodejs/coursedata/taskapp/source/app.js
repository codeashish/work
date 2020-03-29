const express = require("express");
const app = express();
const validator = require('validator');
require("./db/mongoose");
const chalk = require('chalk');
const Task = require("./models/task");
const User = require("./models/user");

const userrouter = require("./routers/users");
const taskrouter = require("./routers/task");
// const maintaince = false;

const port = process.env.PORT || 8080;


// app.use((req, res, next) => {
//     if (maintaince) {
//         res.status(500).send("Maintaince Mode");
//     } else {
//         next();
//     }

// })

const multer = require('multer');




// const upload = multer({
//     dest: 'images',
//     limits: {
//         fileSize: 100000
//     }
// });



// app.post('/upload', upload.single('upload'), (req, res) => {
//     res.send()
// }, (err, req, res, next) => {
//     res.status(400).send({
//         error: err.message
//     })
// })



app.use(express.json());
app.use(userrouter);
app.use(taskrouter);

app.listen(port, () => {
    console.log("Server is running in port ", port);
});

// const pet = {
//     dog: "Sandy"

// }
// pet.toJSON = function () {
//     console.log(this)
//     return this
// }

// console.log(JSON.stringify(pet));

// const main = asyncs () => {
//     // const task = await Task.findById('5e7b2f44038d266f0d682ef0')
//     // await task.populate('owner').execPopulate();
//     // console.log(task.owner)
//     const user = await User.findById('5e7b2e26ded98a6c89e52e31');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks)

// }
// main()





//https://www.getpostman.com/collections/ce82a60acd7851813f07