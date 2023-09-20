const mongoose = require('mongoose');

const validateEmail = function (email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required!'] },
    email: {
        type: String,
        required: [true, 'Email is required!'],
        unique: [true, 'Email already exists!'],
        trim: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        minLength: [6, 'Password must have 6 or more characters']
    },
    photo: {
        type: String,
        required: [true, 'Photo is required!'],
        default: ''
    },
    phone: { type: String },
    bio: {
        type: String,
        minLength: [250, 'Bio is not more then 250 characters']
    },

}, { timestamps: true });

const User = mongoose.model('user', userSchema);
module.exports = User;