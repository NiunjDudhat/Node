const jwt = require('jsonwebtoken');
const User = require("../models/user.model");

const generateToken = async (_id) => {
    try {
        const user = await User.findById(_id);

        const accessToken = await jwt.sign({
            _id: user._id,
            role: user.role
        }, process.env.ACCESSTOKEN, { expiresIn: 60 * 60 });


        const refreshToken = await jwt.sign({
            _id: user._id
        }, process.env.REFRESHTOKEN, { expiresIn: 60 * 60 * 24 });

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new Error('Error is generate tokens: ' + error)
    }
}

module.exports = generateToken