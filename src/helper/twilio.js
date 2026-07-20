const sendOTP = (to, otp, userName) => {
    try {
        const accountSid = process.env.TWILIO_ASID;
        const authToken = process.env.TWILIO_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        client.messages
            .create({
                body: `${userName}, your verification code is ${otp}`,
                messagingServiceSid: process.env.TWILIO_MESSAGE_SERVICES,
                to: to
            })
            .then(message => console.log(message.sid));
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendOTP;