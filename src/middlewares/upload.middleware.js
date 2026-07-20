const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {

    const newPath = path.join('public/images', file.fieldname);
    fs.mkdir(newPath, {recursive: true}, (error) => {
        console.log(error);
        if(error){
            cb(error?.message, null)
        }  
    })
    // cb(null, newPath)
    cb(null, "/tmp");

  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + "_" + file.originalname)
  }
})

const upload = multer({ storage: storage })

// Source - https://stackoverflow.com/q/71877646
// Posted by Ken Ingram, modified by community. See post 'Timeline' for change history
// Retrieved 2026-06-26, License - CC BY-SA 4.0

module.exports = upload;