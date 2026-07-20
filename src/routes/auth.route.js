const passport = require('passport');
const express = require('express');
const { register, login, logout, checkAuth, resendOTP, verifyUser, newGenerateToken } = require('../controllers/auth.controller');
const generateToken = require('../helper/generateToken');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/generateToken', newGenerateToken);
router.post('/logout', logout);
router.post('/checkAuth', checkAuth);
router.post('/verifyuser', verifyUser);
router.post('/resendotp', resendOTP);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: `${clientUrl}/login?error=google` }),
    async function (req, res) {
        console.log("fffff", req.user._id);
        
        const { accessToken, refreshToken } = await generateToken(req.user._id);

        console.log(accessToken, refreshToken);
        

        res.status(200)
            .cookie('accessToken', accessToken, { maxAge: 60 * 60 * 1000, secure: true, httpOnly: true })
            .cookie('refreshToken', refreshToken, { maxAge: 60 * 60 * 24 * 1000, secure: true, httpOnly: true })
            .redirect(clientUrl);
    });

module.exports = router;