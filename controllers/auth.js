const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

exports.renderAccount = (req,res)=>{
    try{
        res.render('account.ejs')
    } catch(err){
        console.error(err)
    }
}

exports.createAccount = (req,res,next)=>{
    try{
        const validationErrors = []

        if(!validator.isLength(req.body.userName, {min:3})) validationErrors.push({msg: 'Username is too short (3 char min.)'})
        if(!validator.isEmail(req.body.email)) validationErrors.push({msg: 'Please enter valid email address'})
        if(!validator.isLength(req.body.password, {min:8})) validationErrors.push({msg:'Password must be at least 8 characters long'})
        if(req.body.password !== req.body.confirmedPassword) validationErrors.push({msg: 'Please enter matching passwords'})

        if(validationErrors.length){
            req.flash('errors', validationErrors)
            return res.redirect('../account')
        }

        req.body.email = validator.normalizeEmail(req.body.email, {gmail_remove_dots: true})

        const user = new User({
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password
        })

        User.findOne({$or:[
            {userName: req.body.userName},
            {email: req.body.email}
        ]}, (err, result)=>{
            if(err) {return next(err)}
            if(result){
                req.flash('errors', {msg:'Account with that username and/or email already exists'})
                return res.redirect('../account')
            }
            user.save((err)=>{
                if(err) {return next(err)}
                req.logIn(user, (err)=>{
                    if(err) {
                        return next(err)
                    }
                res.redirect('/quotes')
                })
            })
        })
    }catch (err){
        console.log(err)
    }
}

exports.loginAccount = (req, res, next)=>{
    try{
        const validationErrors = []

        if(!validator.isEmail(req.body.email)) validationErrors.push({msg: 'Enter e-mail address'})
        if(validator.isEmpty(req.body.password)) validationErrors.push({msg: 'Please enter password'})

        if(validationErrors.length){
            req.flash('errors', validationErrors)
            return res.redirect('../account')
        }

        req.body.email = validator.normalizeEmail(req.body.email, {gmail_remove_dots: true})

        passport.authenticate('local', (err, user, info)=>{
            if(err){ return next(err)}
            if(!user){
                req.flash('errors', info)
                return res.redirect('/account')
            }
            req.logIn(user, (err)=>{
                if(err){ return next(err)}
                req.flash('success', {msg:'Success. You are logged in.'})
                res.redirect('/quotes')
            })
        })(req, res, next)
        
    }catch(err) {
        console.log(err)
    }
}

exports.logoutAccount = (req, res) =>{
    req.session.destroy((err)=>{
        if(err) console.log('eRRoR',err)
        req.user = null;
        res.redirect('/')
    })
}