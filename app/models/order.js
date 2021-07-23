const mongoose = require("mongoose")

const Schema = mongoose.Schema

const orderSchema = new Schema({
    customerId : { type : mongoose.Types.ObjectId, required : true  },
    products : { type : Object, required : true  },
    total : { type : Number, required : true  },
    phone : { type : Number, required : true  },
    address : { type : String, required : true },
    paymentmethod : { type : String, default : 'COD' },
    status : { type : String, default : 'order_placed' },

}, {timestamps: true})

module.exports = mongoose.model('Order', orderSchema)