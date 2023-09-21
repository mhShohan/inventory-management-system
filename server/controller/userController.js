const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

//project import 
const User = require('../model/User');

const handler = {};

handler.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('All fields are required!');
    }
    if (password.length < 6) {
        res.status(400);
        throw new Error('password must have at least 6 characters!');
    }

    //check existing User
    const existedUser = await User.findOne({ email });

    if (existedUser) {
        res.status(400);
        throw new Error('Already registered with this email!');
    }


    //create User
    const user = await User.create({ name, email, password });
    const token = generateToken({ _id: user._id, email: user.email, name: user.name });

    //send HTTP only cookie
    res.cookie('token', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        sameSite: 'none',
        secure: true
    });

    if (user) {
        res.status(201).json({ email: user.email, name: user.name, token });
    } else {
        res.status(400);
        throw new Error('Error to register new user!');
    }
});



module.exports = handler;