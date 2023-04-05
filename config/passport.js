const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function(passport){
    passport.use(new LocalStrategy({usernameField: 'email'}, (email,password,done)=>{
        User.findOne({email: email}, (err, user)=>{
            if(err){ return done(err)}
            if(!user){
                return done(null, false, {msg: `Email ${email} does not exist.`})
            }
            if(!user.password){
                return done(null, false, {msg: `Tu testiram localStrat; user nema password u DB??`})
            }
            user.comparePassword(password, (err, isMatch)=>{
                if(err){ return done(err)}
                if(isMatch){
                    return done(null, user)
                }
                return done(null, false, {msg:`Invalid username or password.`})
            })
        })
    }))

    passport.serializeUser((user, done)=>{
        done(null, user.id)
    })

    passport.deserializeUser((id, done)=>{
        User.findById(id, (err,user)=> done(err, user))
    })
}