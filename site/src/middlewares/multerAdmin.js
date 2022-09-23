module.exports = (req,res,next) => {
    if (req.cesion.userLogin.rol === 'admin'){
        return next()
    }
   else  {res.redirect('/')
}}