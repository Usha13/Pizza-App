const { default: axios } = require("axios")

function cartController() {
    return { 
        index(req,res) {
            res.render('customer/cart')
        },
        update(req,res) { 
           if(! req.session.cart){
               req.session.cart = {
                   items : {},
                   totalQty : 0,
                   totalPrice : 0
                   }
            }
            const cart = req.session.cart
            if(!cart.items[req.body._id]){
                 cart.items[req.body._id] = {
                     item : req.body,
                     qty : 1,
                 }
                 cart.totalQty = cart.totalQty + 1
                 cart.totalPrice = cart.totalPrice + req.body.price
            }
            else{
                cart.items[req.body._id].qty += 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            }

            res.send({ totalQty : req.session.cart.totalQty})
        },

        delete(req,res) { 
            
            const cart = req.session.cart
             
            delete cart.items[req.body.item._id]
            cart.totalQty = cart.totalQty - req.body.qty
            cart.totalPrice = cart.totalPrice - (req.body.item.price * req.body.qty)
            
            res.send({ data : "all okk"})
         }
    }
}
  
  module.exports = cartController