const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require("./task");
const sharp = require('sharp')

const userSchema = new mongoose.Schema({
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
    },

    tokens: [{
        token: {
            type: String,
            require: true
        }
    }],

    avtaar: {
        type: Buffer,
    }





}, {
    timestamps: true,
})
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})


userSchema.methods.generatejwttoken = async function () {

    const user = this;
    const token = jwt.sign({
        _id: user._id.toString()
    }, "Ashishapp", );

    user.tokens = user.tokens.concat({
        token
    })
    await user.save();
    return token
}




// userSchema.methods.getPublicProfile = function () {
//     const user = this;
//     const userobj = user.toObject();
//     delete userobj.password
//     delete userobj.tokens
//     return userobj
// }

userSchema.methods.toJSON = function () {
    const user = this;
    const userobj = user.toObject();
    delete userobj.tokens
    delete userobj.password
    delete userobj.avtaar
    return userobj
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({
        email
    })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}


//Hashig a password
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
        console.log(user.password);

    }

    next()
})




userSchema.pre("remove", async function (next) {
    const user = this;
    await Task.deleteMany({
        owner: user._id
    })


    next();

});




const User = mongoose.model("User", userSchema);
module.exports = User