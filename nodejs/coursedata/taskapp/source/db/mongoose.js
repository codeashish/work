const mongoose = require("mongoose");

mongoose.connect(
    'mongodb://localhost/taskmanagerapi', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }



)


// const taskschema = new mongoose.Schema({
//     description: {
//         type: String,
//         required: true,
//         trim: true,

//     },
//     completed: {
//         type: Boolean,
//         default: false,

//     }


// })

// const tasks = mongoose.model('tasks', taskschema);
// module.exports = tasks;

// const mail = new tasks({
//     description: 'Mail boss',


// })


// mail.save().then(() => {
//     console.log(mail);
// }).catch((err) => {
//     console.log(err.message);
// })