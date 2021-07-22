function authController() {
    return { 
        loginRegister(req,res) {
            res.render('auth/login_register')
        }
    }
  }
  
  module.exports = authController