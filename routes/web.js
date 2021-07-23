const homeController = require("../app/http/controllers/homeController")
const authController = require("../app/http/controllers/authController")
const cartController = require("../app/http/controllers/customers/cartController")

function initRoutes(app) {
    app.get('/', homeController().index)
      
    app.get('/login_register', authController().loginRegister)

    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)
    app.post('/delete-cart', cartController().delete)
}

module.exports = initRoutes