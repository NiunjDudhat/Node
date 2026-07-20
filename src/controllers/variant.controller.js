const { Variant, Products } = require('../../models/index');
const variantService = require('../services/variant.service')

const getAllVariants = async (req, res) => {
    try {
        const variant = await variantService.findAllVariants();

        if(!variant){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to fetch variant.'
            })
        }

        res.status(200).json({
            success: true,
            data: variant,
            message: 'Variant fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const getVariantById = async (req, res) => {
    try {
        const variant = await variantService.findVariantById(req);

        if(!variant){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Variant not found.'
            })
        }

        res.status(200).json({
            success: true,
            data: variant,
            message: 'Variant fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const createVariant = async (req, res) => {
    try {
        const variant = await variantService.createVariant(req);

        if(!variant){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to create variant.'
            })
        }

        res.status(200).json({
            success: true,
            data: variant,
            message: 'Variant created successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const updateVariant = async (req, res) => {
    try {
        const variant = await variantService.updateVariantById(req, req);

        if(!variant){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to update variant.'
            })
        }

        res.status(200).json({
            success: true,
            data: variant,
            message: 'Variant updated successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const deleteVariant = async (req, res) => {
    try {
        const variant = await variantService.deleteVariantById(req);

        if(!variant){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to delete variant.'
            })
        }

        res.status(200).json({
            success: true,
            data: variant,
            message: 'Variant deleted successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}



// Here MySQL Controller
const allVariant = async (req, res) => {
    try {
        const result = await Variant.findAll({
            include: [
                {
                    model: Products,
                    as: 'productInfo'
                }
            ]
        });


        if (!result) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to fetch variants.'
            })
        }

        res.status(200).json({
            success: true,
            data: result,
            message: 'Variants fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const addVariant = async (req, res) => {
    try {
        const variant = await Variant.create(req.body);

        if (!variant) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to create variant.'
            })
        }

        res.status(200).json({
            success: true,
            data: variant,
            message: 'Variant created successfully.'
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
    // getAllVariants,
    // getVariantById,
    // createVariant,
    // updateVariant,
    // deleteVariant


    // MySQL controller
    allVariant,
    addVariant
}