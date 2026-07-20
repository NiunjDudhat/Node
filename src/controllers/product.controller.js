const { Products, Terms, Variant, Tags } = require('../../models/index');
const productService = require('../services/product.service')

const getAllProducts = async (req, res) => {
    try {
        // #swagger.tags = ['Product']
        const products = await productService.findAllProducts();

        if (!products) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to fetch products.'
            })
        }

        res.status(200).json({
            success: true,
            data: products,
            message: 'Products fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const getProductById = async (req, res) => {
    try {
        // #swagger.tags = ['Product']
        const product = await productService.findProductById(req);

        if (!product) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Product not found.'
            })
        }

        res.status(200).json({
            success: true,
            data: product,
            message: 'Product fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const createProduct = async (req, res) => {
    try {
        // #swagger.tags = ['Product']
        const product = await productService.createProduct(req);

        if (!product) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to create product.'
            })
        }

        res.status(200).json({
            success: true,
            data: product,
            message: 'Product created successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        // #swagger.tags = ['Product']
        const product = await productService.updateProductById(req, req);

        if (!product) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to update product.'
            })
        }

        res.status(200).json({
            success: true,
            data: product,
            message: 'Product updated successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        // #swagger.tags = ['Product']
        const product = await productService.deleteProductById(req);

        if (!product) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to delete product.'
            })
        }

        res.status(200).json({
            success: true,
            data: product,
            message: 'Product deleted successfully.'
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
const allProduct = async (req, res) => {
    try {
        const result = await Products.findAll({
            include: [
                {
                    model: Terms,
                    as: 'termsInfo'
                },
                {
                    model: Variant,
                    as: 'variantInfo'
                }
            ]
        });


        if (!result) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to fetch products.'
            })
        }

        res.status(200).json({
            success: true,
            data: result,
            message: 'Products fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const addProduct = async (req, res) => {
    try {
        const product = await Products.create(req.body);

        if (!product) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to create product.'
            })
        }

        res.status(200).json({
            success: true,
            data: product,
            message: 'Product created successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const assignTagToProduct = async (req, res) => {
    try {
        const { product_id, tag_id } = req.body;

        const product = await Products.findByPk(product_id);
        const tags = await Tags.findByPk(tag_id);

        if (!product || !tags) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Product or Tag not found.'
            })
        }

        const result = await product.addTagInfo(tags);

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

const getTagToProduct = async (req, res) => {
    try {
        const { product_id } = req.body;

        const product = await Products.findByPk(product_id);

        if (!product) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Product not found.'
            })
        }

        const result = await product.getTagInfo();

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

const removeTagToProduct = async (req, res) => {
    try {
        const { product_id, tag_id } = req.body;

        const product = await Products.findByPk(product_id);
        const tag = await Tags.findByPk(tag_id);

        if (!product || !tag) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Product or Tag not found.'
            })
        }

        const result = await product.removeTagInfo(tag_id);

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
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,

    // MySQL controller
    allProduct,
    addProduct,
    assignTagToProduct,
    getTagToProduct,
    removeTagToProduct
}