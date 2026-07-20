const uploadImage = require("../helper/uploadImage");
const Category = require("../models/category.model")
const fs = require('fs');

exports.getAllCategories = async (req, res) => {
    return await Category.find();
}

exports.getCategoryByID = async (req, res) => {
    return await Category.findById(req.params.id);
    // return await Category.findById(req.query._id);      // get query
}

exports.createCategory = async (req, res) => {    
    const categoey = await Category.create(req.body);

    const upload_img_URL = await uploadImage.uploadImage(req?.file?.path, 'category');

    categoey.category_img.public_id = upload_img_URL?.public_id
    categoey.category_img.url = upload_img_URL?.url

    categoey.save({validateBeforeSave: false})
    
    fs.unlinkSync(req?.file?.path);
            
    return categoey;
}

exports.updateCategory = async (req, res) => {
    if(req.file){
        const findCategory = await Category.findById(req.params.id);
        await uploadImage.deleteImage(findCategory?.category_img?.public_id)
        const upload_img_URL = await uploadImage.uploadImage(req?.file?.path, 'category');

        findCategory.category_img.public_id = upload_img_URL?.public_id
        findCategory.category_img.url = upload_img_URL?.url

        findCategory.save({validateBeforeSave: false})
    }

    return await Category.findByIdAndUpdate(req.params.id, req.body);

    // return await Category.findByIdAndUpdate(req.query, req.body);    // update category with query
}

exports.deleteCategory = async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);

    await uploadImage.deleteImage(category?.category_img?.public_id)
    
    return category;
}

exports.activeCategory = async (req, res) => {
    const data = await Category.countDocuments({isActive: true})
    return ({
        activeCategory: data
    })
}

// exports.findMostProduct = async (req, res) => {
//     const pipeline = [];
//     pipeline.push({
//         $lookup: {
//             from: 'products',
//             local: 'categoru_id'
            
//             as: 'productData'
//         }
//     })
// }