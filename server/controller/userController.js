const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//project import 
const User = require('../model/User');
const sendMail = require('../utils/sendMail');

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

        return res.status(200).json({ _id: user._id, email: user.email, name: user.name, token });
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

handler.getSingleUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

handler.verifyLoggedIn = asyncHandler(async (req, res) => {
    try {
        // const token = req.cookies.token;
        const token = req.headers.authorization;
        const decode = jwt.verify(token, process.env.JWT);


        if (!decode) {
            res.status(403);
            throw new Error('Token Expired! Please login');
        }

        if (decode) {
            return res.status(200).json(true);
        }
    } catch (error) {
        return res.status(401).json(false);
    }

});

handler.updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
        user.name = user.email;
        user.name = req.body.name || user.name;
        user.phone = req.body.phone || user.phone;
        user.bio = req.body.bio || user.bio;
        user.photo = req.body.photo || user.photo;

        const updatedUser = await user.save();

        return res.status(200).json(updatedUser);
    }
    return res.status(404).json({ error: 'User not updated!' });
});

handler.changePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (req.body.newPassword !== req.body.confirmPassword) {
        res.status(409);
        throw new Error('Must provide same password as confirm password');
    }
    const passwordMatch = await bcrypt.compare(req.body.oldPassword, user.password);

    if (!passwordMatch) {
        res.status(404);
        throw new Error('Password does not match with old Password');
    }


    user.password = req.body.newPassword;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully!' });
});

handler.forgotPassword = asyncHandler(async (req, res) => {
    const response = sendMail({
        subject: 'hello',
        message: 'hello',
        sendTo: 'mehdihasanshohan17@gmail.com',
        replyTo: 'mshohanhasan@gmail.com'
    });
    res.json({ message: 'mail sent', response });
});

module.exports = handler;