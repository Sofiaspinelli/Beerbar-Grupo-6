module.exports = (req,res,next) => {
    if (req.session.userLogin && req.session.userLogin.rol === 2){
        return next()
    }
   else  {res.redirect('/')}
}