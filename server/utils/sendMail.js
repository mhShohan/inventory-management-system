const nodemailer = require('nodemailer');

const sendMail = async ({ subject, message, sendTo, replayTo }) => {

    const transporter = await nodemailer.createTransport({
        service: 'gmail',
        host: process.env.Email_Host,
        port: 587,
        secure: false,
        auth: {
            user: process.env.Email,
            pass: process.env.Pass
        }
    });

    const mailOptions = {
        from: { name: 'Inventory Management System', address: process.env.Email }, // sender address
        to: [sendTo], // list of receivers
        subject: subject, // Subject line
        replayTo: replayTo,
        html: message// plain text body
    };

    try {
        const res = await transporter.sendMail(mailOptions);
        return res;
    } catch (error) {
        console.log(error);
    }

};

module.exports = sendMail;