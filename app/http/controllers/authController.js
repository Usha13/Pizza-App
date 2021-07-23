const User = require('../../models/user')
const bcrypt = require('bcrypt');
const passport = require('passport')

function authController() {
    return { 
        loginRegister(req,res) {
            res.render('auth/login_register')
        },
        async register(req, res){
           const {username , email, password} = req.body
           
           const existemail = await User.findOne({email: email})
           if(existemail){
                req.flash('rerror', 'Email Already Exist');
                res.redirect('/login_register')
           }
           else{
            bcrypt.hash(password,10 , (err, hashedpsw)=>{
                if(err){
                     req.flash('rerror', 'Something went wrong');
                     res.redirect('/login_register')
                }
                const user = new User({
                         username,
                         email,
                         password : hashedpsw
                     })
                 
                 user.save().then((user)=> {
                     res.redirect('/')
                 }).catch((err)=>{
                     req.flash('rerror', 'Something went wrong');
                     res.redirect('/login_register')
                 })
            })
           }
        },

        login(req, res, next){
            passport.authenticate('local', (err, user, info)=>{

                if(err){
                    req.flash('lerror', info.message);
                    return next(err)
                }

                if(!user) {
                    req.flash('lerror', info.message);
                    return res.redirect('/login_register')
                }

                req.logIn(user, (err)=>{
                    if(err){
                        req.flash('lerror', info.message);
                        return next(err)
                    }

                    res.redirect('/')
                })

            })(req, res, next)
        },

        logout(req,res) {
            req.logout()
            res.redirect('/login_register')
        }
    }
  }
  
  module.exports = authController