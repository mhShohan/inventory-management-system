const handler = {};

handler.registerUser = (req, res) => {
    if (!req.body.email) {
        res.status(400);
        throw new Error('need email');
    }
    res.json({ msg: 'post' });
};

module.exports = handler;