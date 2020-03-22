const mongoose = require("mongoose");
const validator = require('validator');

mongoose.connect(
    'mongodb://localhost/taskmanagerapi', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }



)


const taskschema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,

    },
    completed: {
        type: Boolean,
        default: false,

    }


})

const tasks = mongoose.model('tasks', taskschema);
module.exports = tasks;