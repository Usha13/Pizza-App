const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/user')

function init(passport) {
    passport.use(new LocalStrategy({ usernameField : 'email'}, async (email, password, done)=> {
        const user = await User.findOne({email})
        if(!user){
            return done(null, false, { message : "User Not Exist"})
        }

        bcrypt.compare(password, user.password).then(match=> {
            if(match)
            {
                return done(null, user, {message : "Login Successfully"})
            }
            return done(null, false, {message : "Invalid username or password"})

        }).catch(err=> {
            return done(err, false, {message : "Something went wrong"} )
        })
    })) 
    
    
    passport.serializeUser((user, done)=>{
       done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
       User.findById(id, (err,user)=>{
           done(err, user)
       })
    })

}
module.exports = init