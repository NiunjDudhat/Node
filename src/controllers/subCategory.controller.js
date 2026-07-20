const subCategoryService = require('../services/subCategory.service')

const getAllSubCategories = async (req, res) => {
    try {
        const subcategories = await subCategoryService.findAllSubcategories();

        if(!subcategories){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to fetch subcategories.'
            })
        }

        res.status(200).json({
            success: true,
            data: subcategories,
            message: 'Subcategories fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const getSubCategoryById = async (req, res) => {
    try {
        const subcategory = await subCategoryService.findSubcategoryById(req);

        if(!subcategory){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Subcategory not found.'
            })
        }

        res.status(200).json({
            success: true,
            data: subcategory,
            message: 'Subcategory fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const createSubCategory = async (req, res) => {
    try {
        const subcategory = await subCategoryService.createSubcategory(req);

        if(!subcategory){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to create subcategory.'
            })
        }

        res.status(200).json({
            success: true,
            data: subcategory,
            message: 'Subcategory created successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const updateSubCategory = async (req, res) => {
    try {
        const subcategory = await subCategoryService.updateSubcategoryById(req, req);

        if(!subcategory){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to update subcategory.'
            })
        }

        res.status(200).json({
            success: true,
            data: subcategory,
            message: 'Subcategory updated successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const deleteSubCategory = async (req, res) => {
    try {
        const subcategory = await subCategoryService.deleteSubcategoryById(req);

        if(!subcategory){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to delete subcategory.'
            })
        }

        res.status(200).json({
            success: true,
            data: subcategory,
            message: 'Subcategory deleted successfully.'
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
    getAllSubCategories,
    getSubCategoryById,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory
}