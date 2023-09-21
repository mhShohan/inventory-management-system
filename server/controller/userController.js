const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcrypt');

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

handler.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error('All fields are required!');
    }

    //check existing User
    const user = await User.findOne({ email });

    if (!user) {
        res.status(404);
        throw new Error('User not found!');
    }

    const matchedPassword = await bcrypt.compare(password, user.password);

    if (user && matchedPassword) {
        const token = generateToken({ _id: user._id, email: user.email, name: user.name });

        //send HTTP only cookie
        res.cookie('token', token, {
            path: '/',
            httpOnly: true,
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            sameSite: 'none',
            secure: true
        });

        return res.status(200).json({ email: user.email, name: user.name, token });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});

handler.logout = asyncHandler(async (req, res) => {
    res.cookie('token', '', {
        path: '/',
        httpOnly: true,
        expires: new Date(0),
        sameSite: 'none',
        secure: true
    });

    return res.status(200).json({ message: 'Logout successfully!' });
});

module.exports = handler;