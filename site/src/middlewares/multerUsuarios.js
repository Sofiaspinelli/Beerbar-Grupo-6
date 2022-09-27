const path = require('path')
const multer = require('multer')
const usuario = require('../data/users.json')

const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null,'./public/img')
    },
    filename:(req,file,callback) => {
        callback(null,'usuario' + Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = function(req, file,callback) {
    if(!file.originalname.match(/\.(jpg|jpeg|png|jfif|webp)$/)){
        req.fileValidationError = "Solo se permite imágenes";
        return callback(null,false,req.fileValidationError);
    }
    callback(null,true);
}

const upload = multer({
    storage,
    fileFilter
    })

module.exports = upload