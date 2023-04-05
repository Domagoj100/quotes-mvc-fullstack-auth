module.exports = {
    ensureAuth: function(req,res,next){
        if(req.isAuthenticated()){
            return next()
        }else{
            const loginError = [{msg:'Please login to access quotes'}]
            req.flash('errors', loginError)
            res.redirect('/account')
        }
    }
}