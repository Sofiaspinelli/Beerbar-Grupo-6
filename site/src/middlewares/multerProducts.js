const path = require('path');
const multer = require('multer');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/productos');
    },
    filename: (req, file, cb) => {
        cb(null, 'img-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = function(req, file, callback) {
    if(!file.originalname.match(/\.(jpg|jpeg|png|jfif|gif|webp)$/)){
        req.fileValidationError = "Solo se permite imágenes";
        return callback(null,false,req.fileValidationError);
    }
    callback(null,true);
};

const upload = multer({storage, fileFilter});

module.exports = upload;