const userService = require('../services/user.service')

const getAllUsers = async (req, res) => {
    try {
        const user = await userService.findAllUsers();

        if(!user){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to fetch user.'
            })
        }

        res.status(200).json({
            success: true,
            data: user,
            message: 'User fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await userService.findUserById(req);

        if(!user){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'User not found.'
            })
        }

        res.status(200).json({
            success: true,
            data: user,
            message: 'User fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const createUser = async (req, res) => {
    try {
        const user = await userService.createUser(req);

        if(!user){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to create user.'
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
            message: 'Internal Server Error' + error.message
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await userService.updateUserById(req, req);

        if(!user){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to update user.'
            })
        }

        res.status(200).json({
            success: true,
            data: user,
            message: 'User updated successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await userService.deleteUserById(req);

        if(!user){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to delete user.'
            })
        }

        res.status(200).json({
            success: true,
            data: user,
            message: 'User deleted successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}