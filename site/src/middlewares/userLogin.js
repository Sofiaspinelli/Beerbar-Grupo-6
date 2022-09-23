module.exports = (req,res,next) => {
    if (req.cesion.userLogin) {
        res.locals.userLogin = req.cesion.userLogin
        next();
    }
    else { res.redirect('/login')}
}