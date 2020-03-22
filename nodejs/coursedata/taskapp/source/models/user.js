const mongoose = require('mongoose');
const validator = require('validator');
const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        trim: true,

    },
    age: {
        type: Number,
        required: true,
        min: 1,
        max: 100,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be negative');
            }

        },

        default: 0,
    },

    email: {
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Error happened");
            }
        },
        trim: true,
        lowercase: true,
    },


    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("Password must not be password")
            }
        }
    }




});

const user = mongoose.model("user", userschema);

module.exports = user