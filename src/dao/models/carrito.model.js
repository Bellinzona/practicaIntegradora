const mongoose = require("mongoose")


const carritoSchema = new mongoose.Schema({

    productosCarrito :{
        type: [{
            productName: String,
            productId: String,
            quantity: Number,
        }],
        default: []
    }

    
    
})

const carritoModel = mongoose.model("carts", carritoSchema)



module.exports = carritoModel