const jwt = require('jsonwebtoken');
const pool = require("../db/mysql");
const bcrypt = require('bcrypt');
const sendOTP = require('../helper/twilio')
const User = require("../models/user.model");
const moment = require('moment');
const generateToken = require('../helper/generateToken');
const sendEmail = require('../helper/sendEmail');


exports.registerUser = async (req, res) => {
    // This is Mongo query
    const { name, email, mobileNo, address, password } = req.body;

    try {
        const userExists = await User.find({ email })

        if (!userExists) {
            return res.status(409).json({
                success: false,
                data: null,
                message: 'User already exists!'
            })
        }
        const saltRounds = 10;
        const bcryptPassword = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            ...req.body,
            password: bcryptPassword
        });

        const otp = Math.floor(1000 + Math.random() * 9000);
        // // await sendOTP(mobileNo, otp, name);
        console.log(otp + ' ', 'OTP send successfully');

        const userData = await User.findById(user._id).select("-password");

        // mail send
        await sendEmail(email, 'Send OTP', name, otp);

        userData.otp = otp;
        userData.otpExpired = moment(new Date).add(5, 'm').toDate();
        await userData.save({ validateBeforeSave: false })

        return userData;

    } catch (error) {
        return res.status(409).json({
            success: false,
            data: null,
            message: 'User already exists!'
        })
    }

    // return {
    //     name, email, mobileNo, address,
    // }


    // Below query is mysql
    // const {name, email, mobileNo, address, password}  = req.body;    
    // const [user] = await pool.query('INSERT INTO Users (name, email, mobileNo, address, password) VALUES (?, ?, ?, ?, ?)', [name, email, mobileNo, address, bcryptPassword])

    // const otp = Math.floor(1000 + Math.random() * 9000);
    // // await sendOTP(mobileNo, otp, name);
    // console.log(otp+ ' ', 'OTP send successfully');

    // return {
    //     id: user.insertId,
    //     name, email, mobileNo, address,
    //     otp
    // }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email })
    console.log("userExists+++", userExists);

    if (!userExists) {
        return res.status(400).json({
            success: false,
            data: null,
            message: 'User not found!'
        })
    }

    const hashPassword = await bcrypt.compare(password, userExists.password);

    if (!hashPassword) {
        return res.status(400).json({
            success: false,
            data: null,
            message: 'Invalid email/passwoed.'
        })
    }

    const { accessToken, refreshToken } = await generateToken(userExists._id);

    const sUserData = await User.findById(userExists._id).select('-password');
    console.log('login sUserData++++', sUserData);

    // ++++++++++++++++++
    const otp = Math.floor(1000 + Math.random() * 9000);

    // mail send
    await sendEmail(sUserData?.email, 'Send OTP', sUserData?.name, otp);

    sUserData.otp = otp;
    sUserData.otpExpired = moment(new Date).add(5, 'm').toDate();
    await sUserData.save({ validateBeforeSave: false })
    // ++++++++++++++++++

    return { sUserData, accessToken, refreshToken }
}

exports.createToken = async (req, res) => {
    const token = req.cookies.refreshToken || req.header('Authorization')?.replace('Bearer ', '');
    const verifyToken = await jwt.verify(token, process.env.REFRESHTOKEN, await function (err, decoded) {
        if (err) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'Invalid token.'
            })
        }

        return decoded
    })

    const user = await User.findById(verifyToken?._id);

    if (!user) {
        return res.status(400).json({
            success: false,
            data: null,
            message: 'User not found.'
        })
    }

    if (req.cookies.refreshToken !== user?.refreshToken) {
        return res.status(400).json({
            success: false,
            data: null,
            message: 'User token not metched.'
        })
    }

    const { accessToken, refreshToken } = await generateToken(user._id);

    const sUserData = await User.findById(user._id).select('-password');

    return { sUserData, accessToken, refreshToken }
}

exports.userLogOut = async (req, res) => {
    const user = await User.findById(req.body.user_id).select('-password');

    user.refreshToken = '';
    await user.save({ validateBeforeSave: false })
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    return user;
}

exports.checkUserLoggin = async (req, res) => {
    const token = req.cookies.accessToken || req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({
            success: false,
            data: null,
            message: 'token not found.'
        })
    }

    const verifyToken = await jwt.verify(token, process.env.ACCESSTOKEN)

    const user = await User.findById(verifyToken?._id).select('-password');

    if (!user) {
        return res.status(400).json({
            success: false,
            data: null,
            message: 'User not found.'
        })
    }

    return user;
}

exports.verifiedUser = async (req, res) => {

    const { id, otp } = req.body;

    const user = await User.findById(id);

    if (!user) {
        return res.status(400).json({
            success: false,
            data: null,
            message: 'User not found.'
        })
    }

    if (otp !== user.otp) {
        return res.status(400).json({
            success: false,
            data: null,
            message: 'Invalid OTP. Please try again.'
        })
    }

    if (new Date(user?.otpExpired) < new Date()) {
        return res.status(400).json({
            success: false,
            data: null,
            message: 'OTP has expired. Please request a new one.'
        })
    }



    user.isVerified = true
    await user.save({ validateBeforeSave: false })

    return user;
}

exports.resendOTP = async (req, res) => {

    const { id } = req.body;

    const user = await User.findById(id);

    if (!user) {
        return res.status(400).json({
            success: false,
            data: null,
            message: 'User not found.'
        })
    }

    const otp = Math.floor(1000 + Math.random() * 9000);

    //sendOTP msg/mail
    await sendOTP(user.mobileNo, otp, user.name);

    user.otp = otp;
    user.otpExpired = moment(new Date).add(5, 'm').toDate();

    await user.save({ validateBeforeSave: false })

    return {
        otp
    };
}

exports.googleLoggin = async (req, res) => {
    console.log("req++", req.body);
}