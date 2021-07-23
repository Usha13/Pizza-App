const homeController = require("../app/http/controllers/homeController")
const authController = require("../app/http/controllers/authController")
const cartController = require("../app/http/controllers/customers/cartController")
const guest = require("../app/http/middlewares/guest")
const orderController = require("../app/http/controllers/customers/orderController")

function initRoutes(app) {
    app.get('/', homeController().index)
      
    app.get('/login_register', guest, authController().loginRegister)
    app.post('/login', authController().login)
    app.post('/register', authController().register)
    app.post('/logout', authController().logout)

    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)
    app.post('/delete-cart', cartController().delete)

    app.post('/order', orderController().store)
    app.get('/order/:id', orderController().order)
    app.get('/orders', orderController().index)

}

module.exports = initRoutes