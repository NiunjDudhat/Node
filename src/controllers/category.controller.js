const pool = require('../db/mysql');
const categoryService = require('../services/category.service')
const fs = require('fs');

const getAllCategoris = async (req, res) => {
    try {
        // #swagger.tags = ['Category']
        const categoris = await categoryService.getAllCategories();

        if(!categoris){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Categories not Fetched!'
            })
        }

        res.status(200).json({
            success: true,
            data: categoris,
            message: 'Categories Fetched.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const getCategoryByID = async (req, res) => {
    try {
        // #swagger.tags = ['Category']
        const category = await categoryService.getCategoryByID(req);

        if(!category){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Category not Fetched!'
            })
        }

        res.status(200).json({
            success: true,
            data: category,
            message: 'Category Fetched.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const createCategory = async (req, res) => {
    try {        
        // #swagger.tags = ['Category']
        /* #swagger.security = [{
                "apiKeyAuth": []
        }] */
        const category = await categoryService.createCategory(req);

        if(!category){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Category not Created!'
            })
        }

        res.status(200).json({
            success: true,
            data: category,
            message: 'category Fetched.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const updateCategory = async (req, res) => {
    try {
        // #swagger.tags = ['Category']
        const category = await categoryService.updateCategory(req, req);

        if(!category){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Category not Updated!'
            })
        }

        res.status(200).json({
            success: true,
            data: category,
            message: 'Category Updated.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        // #swagger.tags = ['Category']
        const category = await categoryService.deleteCategory(req);

        if(!category){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Category not Deleted!'
            })
        }

        res.status(200).json({
            success: true,
            data: category,
            message: 'Category Deleted.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const activeCategory = async (req, res) => {
    try {
        // #swagger.tags = ['Category']
        const category = await categoryService.activeCategory();

        if(!category){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to fetch active category.'
            })
        }

        res.status(200).json({
            success: true,
            data: category,
            message: 'Active Category fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}




// const mostProducts = async (req, res) => {
//     try {
//         const category = await categoryService.findMostProduct();

//         if(!category){
//             return res.status(400).json({
//                 success: false,
//                 data: [],
//                 message: 'Failed to fetch most products.'
//             })
//         }

//         res.status(200).json({
//             success: true,
//             data: category,
//             message: 'Most products fetched successfully.'
//         })

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             data: [],
//             message: 'Internal Server Error' + error.message
//         })
//     }
// }



// Mysql controller

const allCategoris = async (req, res) => {
    try {
        const [category] = await pool.query('SELECT * FROM categories');

        if(!category){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to fetch categories.'
            })
        }

        res.status(200).json({
            success: true,
            data: category,
            message: 'Categories fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const getSingleCategory = async (req, res) => {
    try {
        const {id} = req.params;
        const [category] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);

        if(category.length == 0){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to fetch category.'
            })
        }

        res.status(200).json({
            success: true,
            data: category[0],
            message: 'Category fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const addCategory = async (req, res) => {
    try {
        const {category_name, category_desc} = req.body;
        let query = "";
        if(req?.file){
            query = 'INSERT INTO categories(category_name, category_desc, category_img) VALUES(?, ?, ?)'
        } else {
            query = 'INSERT INTO categories(category_name, category_desc) VALUES(?, ?)'
        }
        const [category] = await pool.query(query, [category_name, category_desc, req?.file?.path]);
        
        if(!category){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to create category.'
            })
        }

        res.status(200).json({
            success: true,
            data: {
                id: category.insertId,
                ...req.body,
                category_img: req?.file?.path
            },
            message: 'Category fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const {category_name, category_desc} = req.body;
        let query = '';
        let data = []

        const [getData] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
        

        if(req?.file){
            if(getData[0]?.category_img){
                fs.unlinkSync(getData[0]?.category_img);
                console.log('File deleted successfully!');
            }
                query = 'UPDATE categories SET category_name =?, category_desc = ?, category_img = ? WHERE id = ?'
                data = [category_name, category_desc, req?.file?.path, id]
        } else {
            query = 'UPDATE categories SET category_name =?, category_desc = ? WHERE id = ?'
            data = [category_name, category_desc, id]
        }

        const [category] = await pool.query(query, data);

        if(category.affectedRows == 0){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to update category.'
            })
        }

        res.status(200).json({
            success: true,
            data: {
                id: id,
                ...req.body,
                category_img: req?.file?.path
            },
            message: 'Category fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const removeCategory = async (req, res) => {
    try {
        const {id} = req.params;
        const [categorySigle] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
        const [category] = await pool.query('DELETE FROM categories WHERE id = ?', [id]);

        fs.unlinkSync(categorySigle[0]?.category_img);
        console.log('File deleted successfully!');

        if(category.affectedRows == 0){
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to fetch category.'
            })
        }

        res.status(200).json({
            success: true,
            data: categorySigle[0],
            message: 'Category deleted successfully.'
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
    getAllCategoris,
    getCategoryByID,
    createCategory,
    updateCategory,
    deleteCategory,
    activeCategory,


    // mysql controller
    allCategoris,
    getSingleCategory,
    addCategory,
    editCategory,
    removeCategory
}