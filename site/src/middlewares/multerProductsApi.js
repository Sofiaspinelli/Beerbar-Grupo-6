const path = require('path');
const multer = require('multer');
const { validationResult } = require('express-validator');

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../beerbar/public/productos');
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

const upload = multer({storage, fileFilter}).single('img');


module.exports = upload;