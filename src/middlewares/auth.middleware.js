const jwt = require('jsonwebtoken');
const User = require("../models/user.model")

const auth = (roles) => async (req, res, next) => {
    try {
        const token = req.cookies.accessToken || req.header('Authorization')?.replace('Bearer ', '');

        console.log("tokennnn", token);
        

        if(!token){
            return res.status(400).json({
                success: false,
                data: null,
                message: 'token not found.'
            })
        }

        const verifyToken = await jwt.verify(token, process.env.ACCESSTOKEN)

        const user = await User.findById(verifyToken?._id);
        
        if(!user){
            return res.status(400).json({
                success: false,
                data: null,
                message: 'User not found.'
            })
        }
        
        if(!roles.includes(user.role)){
            return res.status(400).json({
                success: false,
                data: null,
                message: user.role + ' ' +'not access.'
            })
        }

        req.user = user

        next();
        
    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

module.exports = auth