const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'./public/img/usuario');
    },
    filename:(req,file,cb) => {
        cb(null,'avatar-' + Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = function(req,file,callback) {
    if(!file.originalname.match(/\.(jpg|jpeg|png|jfif|gif|webp)$/)){
        req.fileValidationError = "Solo se permite imágenes";
        return callback(null,false,req.fileValidationError);
    }
    callback(null,true);
}

const upload=multer({ storage, fileFilter})

module.exports=upload