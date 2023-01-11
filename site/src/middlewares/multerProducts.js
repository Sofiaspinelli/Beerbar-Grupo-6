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

// try {
//     let imagePath = "abc";

//     upload(req, res, (err) => {
//       if (err) {
//         res.status(300).send(err);
//         console.log(err);
//       } else {
//         if (req.file == undefined) {
//           res.status(301).send("image upload failed.");
//         } else {
//           //image uploaded successfully
//           imagePath = "uploads/" + req.file.filename;
//           storeImageLink(res, imagePath);
//         }
//       }
//     });

// } catch (error) {
    
// }

module.exports = upload;