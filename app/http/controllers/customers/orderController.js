
const moment = require('moment')
const Order = require('../../../models/order')

function orderController(){
    return { 
        store(req, res){
            const {phone, address} = req.body
            
            const order= new Order({
                customerId : req.user._id,
                products : req.session.cart.items,
                total: req.session.cart.totalPrice,
                phone,
                address
            })
 
            order.save().then(result=> { 
                req.session.cart = {
                    items : {},
                    totalQty : 0,
                    totalPrice : 0
                 }
                req.flash('success' , "Order Placed Successfully")
                res.redirect('/orders')
            }).catch(err=> {
                req.flash('error' , "Something Went Wrong")
                res.redirect('/cart')
            })

        },

        async order(req,res){
             const oid = req.params.id 
             const order = await Order.findById(oid)
             res.render('customer/order',{
                order,
                moment
            })
        },

        async index(req,res){
            try{
                const orders = await Order.find({customerId : req.user._id}).sort({createdAt: -1})
                if(orders){
                    res.render('customer/orders',{
                        orders,
                        moment
                    })
                }
            }
            catch(err){
                res.redirect('/')
            }
        }
    }
}

module.exports = orderController