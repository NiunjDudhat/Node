const nodemailer = require('nodemailer');
const fs = require("fs");
const path = require("path");


const sendEmail = async (to, sub, username, otp) => {
    try {
        const transporter = await nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'nikul93280dudhat@gmail.com',
                pass: 'lwsm aeyo hsbr iemm'
            }
        });

        const templatePath = path.join(
            __dirname,
            "../email template/verification-email.html"
        );

        let html = fs.readFileSync(templatePath, "utf8");

        // Replace placeholders
        html = html
            .replace(/{{USERNAME}}/g, username)
            .replace(/{{VERIFICATION_CODE}}/g, otp);

        const mailOptions = {
            from: 'nikul93280dudhat@gmail.com',
            to: to,
            subject: sub,
            html
        };

        await transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendEmail