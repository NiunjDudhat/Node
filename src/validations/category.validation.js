const Joi = require('joi');


const getCategoryByIdSchema = {
    params: Joi.object().keys({
        id: Joi.string().required().length(24)
    })
    // query validation
    // query: Joi.object().keys({
    //     _id: Joi.string().required().length(24)
    // })
}

const addCategorySchema = {
    body: Joi.object().keys({
        category_name: Joi.string().required().trim(),
        category_desc: Joi.string().max(100).trim().allow(null),
    })
}

const updateCategorySchema = {
    params: Joi.object().keys({
        id: Joi.string().required().length(24)
    }),
    body: Joi.object().keys({
        category_name: Joi.string().required().trim(),
        category_desc: Joi.string().max(100).trim().allow(null),
    })
}

const deleteCategorySchema = {
    params: Joi.object().keys({
        id: Joi.string().required()
    })
}


module.exports = {
    getCategoryByIdSchema,
    addCategorySchema,
    updateCategorySchema,
    deleteCategorySchema
}