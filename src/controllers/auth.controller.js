const createPDF = require('../helper/pdfmake');
const authService = require('../services/auth.service')

const register = async (req, res) => {
    try {
        // #swagger.tags = ['Auth']
        // const auth = await authService.registerUser(req);        This is mongo query
        const user = await authService.registerUser(req, res);

        // if(user.affectedRows == 0){
        if (!user) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to register user.'
            })
        }

        res.status(200).json({
            success: true,
            data: user,
            message: 'User created successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error:' + error.message
        })
    }
}

const login = async (req, res) => {
    try {
        // #swagger.tags = ['Auth']
        /*  #swagger.parameters['body'] = {
                in: 'body',
                description: 'Add a user',
                
        } */
        const { sUserData, accessToken, refreshToken } = await authService.loginUser(req, res);

        const docDefinition = {
            content: [
                'First paragraph',
                'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
            ]
        };


        await createPDF(docDefinition, `${sUserData?._id}.pdf`)

        return res.status(200)
            .cookie('accessToken', accessToken, { maxAge: 60 * 60 * 1000, secure: true, httpOnly: true, sameSite: 'None' })
            .cookie('refreshToken', refreshToken, { maxAge: 60 * 60 * 24 * 1000, secure: true, httpOnly: true, sameSite: 'None' })
            .json({
                success: true,
                data: sUserData,
                message: 'User login successfully.'
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error:' + error.message
        })
    }
}

const newGenerateToken = async (req, res) => {
    try {
        // #swagger.tags = ['Auth']
        const {sUserData, accessToken, refreshToken} = await authService.createToken(req, res);

        return res.status(200)
            .cookie('accessToken', accessToken, { maxAge: 60 * 60 * 1000, secure: true, httpOnly: true })
            .cookie('refreshToken', refreshToken, { maxAge: 60 * 60 * 24 * 1000, secure: true, httpOnly: true })
            .json({
                success: true,
                data: sUserData,
                message: 'User login successfully.'
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error:' + error.message
        })
    }
}

const logout = async (req, res) => {
    try {
        // #swagger.tags = ['Auth']
        const userData = await authService.userLogOut(req, res);

        return res.status(200).json({
                success: true,
                data: userData,
                message: 'User logout successfully.'
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error:' + error.message
        })
    }
}

const checkAuth = async (req, res) => {
    try {
        // #swagger.tags = ['Auth']
        const userData = await authService.checkUserLoggin(req, res);

        return res.status(200).json({
                success: true,
                data: userData,
                message: 'User authenticated.'
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error:' + error.message
        })
    }
}

const verifyUser = async (req, res) => {
    try {
        // #swagger.tags = ['Auth']
        const userData = await authService.verifiedUser(req, res);

        return res.status(200).json({
                success: true,
                data: userData,
                message: 'User verified successfully.'
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error:' + error.message
        })
    }
}

const resendOTP = async (req, res) => {
    try {
        // #swagger.tags = ['Auth']
        const userData = await authService.resendOTP(req, res);

        return res.status(200).json({
                success: true,
                data: userData,
                message: 'OTP resnsed successfully.'
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error:' + error.message
        })
    }
}

const googleLogin = async (req, res) => {
    try {
        // #swagger.tags = ['Auth']
        const userData = await authService.googleLoggin(req, res);

        return res.status(200).json({
                success: true,
                data: userData,
                message: 'User login successfully.'
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error:' + error.message
        })
    }
}

module.exports = {
    register,
    login,
    newGenerateToken,
    logout,
    checkAuth,
    verifyUser,
    resendOTP,
    googleLogin
}