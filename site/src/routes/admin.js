const {list, crear, newProducts, editar, update, destroy} = require('../controllers/adminController')
const express = require('express');
const Validacion = require('../validaciones/productsValidacion')
const adminCheck = require('../middlewares/multerAdmin')
const router = express.Router();
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null, './public/img')
    },
        filename: (req,file,callback) => {
            callback(null,'img-' + Date.now() + path.extname(file.originalname))
        }
})
const upload = multer({
    storage
})

/* GET home page. */
router.get('/list',adminCheck, list);


// get/post crear
router.get('/crear',adminCheck, crear);
router.post('/crear', upload.single('img'), Validacion, newProducts);

// get/put editar
router.get('/editar/:id',adminCheck, editar);
router.put('/editar/:id', Validacion, update);

// delete
router.delete('/eliminar/:id', destroy)

module.exports = router;

