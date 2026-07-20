const fs = require('fs');
const { Terms, Products, Tags } = require('../../models/index');
const { Op } = require('sequelize');


// Mysql controller

const allTag = async (req, res) => {
    try {
        const result = await Tags.findAll();

        if (!result) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to fetch Tag.'
            })
        }

        res.status(200).json({
            success: true,
            data: result,
            message: 'Tags fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const createTag = async (req, res) => {
    try {
        const result = await product.create(req.body);

        res.status(200).json({
            success: true,
            data: result,
            message: 'Data fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const assignProductToTag = async (req, res) => {
    try {
        const {product_id, tag_id} = req.body;

        const product = await Products.findByPk(product_id);
        const tags = await Tags.findByPk(tag_id);

        if (!product || !tags) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Product or Tag not found.'
            })
        }

        const result = await tags.addProductInfos(product);

        res.status(200).json({
            success: true,
            data: result,
            message: 'Data fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const getProductToTag = async (req, res) => {
    try {
        const {tag_id} = req.body;

        const tags = await Tags.findByPk(tag_id);

        if (!tags) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Tag not found.'
            })
        }

        const result = await tags.getProductInfos();

        res.status(200).json({
            success: true,
            data: result,
            message: 'Data fetched successfully.'
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
    allTag,
    createTag,
    assignProductToTag,
    getProductToTag,
    // removeProductToTag
}