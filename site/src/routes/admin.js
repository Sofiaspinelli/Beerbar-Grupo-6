const {list, crear, newProducts, editar, update, destroy, destroyUser, updateUserAdmin} = require('../controllers/adminController')
const express = require('express');

const adminCheck = require('../middlewares/multerAdmin')
const upload = require('../middlewares/multerProducts')

const Validacion = require('../validations/productsValidacion')

const router = express.Router();
const path = require('path');
const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req,file,callback) => {
//         callback(null, './public/img')
//     },
//         filename: (req,file,callback) => {
//             callback(null,'img-' + Date.now() + path.extname(file.originalname))
//         }
// })
// const upload = multer({
//     storage
// })

/* GET home page. */
router.get('/list',adminCheck, list);


// get/post crear
router.get('/crear',adminCheck, crear);
router.post('/crear', upload.single('img'), /* Validacion, */ newProducts);

// get/put editar
router.get('/editar/:id',adminCheck, editar)
router.put('/editar/:id', upload.single('img'),/*  Validacion, */ update);
router.put('/user/editar/:id', updateUserAdmin);

// delete
router.delete('/eliminar/:id', destroy)
router.delete('/user/eliminar/:id', destroyUser)

module.exports = router;

