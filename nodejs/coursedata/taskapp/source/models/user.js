const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
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
        unique: true,
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

const User = mongoose.model("User", userschema);
userschema.statics.findByCredientials = async (email, password) => {

    const user = await User.findOne({
        email
    });

    if (!user) {
        throw new Error('Unable to login');
    }


    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
        throw new Error("Unable to log");
    }

    return user;



}

//Hashig a password
userschema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
        console.log(user.password);

    }

    next()
})








module.exports = User