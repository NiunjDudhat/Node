const cloudinary = require('../middlewares/cloudinaryConfig');

const uploadImage = async (filePath, folderName) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: `e_commerce/${folderName}`,
      use_filename: true,
    });

    console.log('Upload successful!');
    console.log('Asset URL:', result.secure_url);
    console.log('Public ID:', result.public_id);
    return result;
  } catch (error) {
    console.error('Upload failed:', error);
  }
};


const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log('Deletion result:', result);
  } catch (error) {
    console.error('Deletion failed:', error);
  }
};


module.exports = {
    uploadImage,
    deleteImage
}
