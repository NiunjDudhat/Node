const fs = require('fs');
const { Terms, Products } = require('../../models/index');
const { Op } = require('sequelize');


// Mysql controller

const allTerms = async (req, res) => {
    try {
        const result = await Terms.findAll({
            include: [
                {
                    model: Products,
                    as: 'products'
                }
            ]
        });

        // Normal where
        // const result = await Terms.findAll({
        //     where: {
        //         name: 'Hello'
        //     }
        // });


        // where with Op.or
        // const result = await Terms.findAll({
        //     where: {
        //         [Op.or]: {
        //             name: 'Hello',
        //             id: 4
        //         }
        //     }
        // });

        // where with Op.like
        // const result = await Terms.findAll({
        //     where: {
        //         name: { [Op.like]: '_____1%'}
        //     }
        // });

        // page and limit
        // const page = parseInt(req.query.page);
        // const limit = parseInt(req.query.limit);
        // const result = await Terms.findAll({
        //     limit: limit,
        //     offset: (page - 1) * limit
        // });

        if (!result) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to fetch Terms.'
            })
        }

        res.status(200).json({
            success: true,
            data: result,
            message: 'Terms fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const getSingleTerm = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Terms.findByPk(id)

        if (!result) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to fetch Term.'
            })
        }

        res.status(200).json({
            success: true,
            data: result,
            message: 'Term fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const createTerm = async (req, res) => {
    try {
        const term = await Terms.create(req.body);

        if (!term) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to create Term.'
            })
        }

        res.status(200).json({
            success: true,
            data: term,
            message: 'Term fetched successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const editTerm = async (req, res) => {
    try {
        const { id } = req.params;

        // const result = await Terms.findByPk(id);

        // if (!result) {
            //     return res.status(400).json({
                //         success: false,
                //         data: [],
                //         message: 'Failed to update Term.'
                //     })
                // }
                
        // Method 1
        // result.name = req.body.name,
        // result.description = req.body.description
        // await result.save();


        // Method 2
        await result.update({
            name: req.body.name,
            description: req.body.description
        })
        await result.save();


        // Method 3
        // const result = await Terms.update(
        //     { 
        //         name: req.body.name, 
        //         description: req.body.description
        //     },
        //     {
        //         where: {
        //             id: id
        //         },
        //     },
        // );


        res.status(200).json({
            success: true,
            data: result,
            message: 'Term updated successfully.'
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            data: [],
            message: 'Internal Server Error' + error.message
        })
    }
}

const removeTerm = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Terms.destroy({
            where: {
                id: id
            },
        });

        if (!result) {
            return res.status(400).json({
                success: false,
                data: [],
                message: 'Failed to fetch Term.'
            })
        }

        res.status(200).json({
            success: true,
            data: result,
            message: 'Term deleted successfully.'
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
    allTerms,
    getSingleTerm,
    createTerm,
    editTerm,
    removeTerm
}