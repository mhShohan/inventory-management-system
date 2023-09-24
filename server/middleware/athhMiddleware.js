const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

//project import 
const User = require('../model/User');


const verifyAuth = asyncHandler(async (req, res, next) => {
    try {
        // const token = req.cookies.token;
        const token = req.headers.authorization;

        if (!token) {
            res.status(401);
            throw new Error('Not Authorized! Please login');
        }
        const decode = jwt.verify(token, process.env.JWT);

        if (!decode) {
            res.status(403);
            throw new Error('Token Expired! Please login');
        }

        const user = await User.findById(decode._id).select('-password');

        if (!user) {
            res.status(404);
            throw new Error('User not found');
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401);
        throw new Error('Not Authorized! Please login');
    }
});


module.exports = { verifyAuth };