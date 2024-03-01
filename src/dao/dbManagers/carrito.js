const carritoModel = require("../models/carrito.model")

class Carrito {
    constructor(){

    }

    async getAll(){
        let users = await carritoModel.find().lean()
        return users
      
        
    }


    async getCartId(id){
        let cartId = await carritoModel.findOne({_id: id})
        return cartId
      
        
    }

    async saveCart(productos) {
        try {
            let newCart = await carritoModel.create(productos);
            return newCart;
        } catch (error) {
            console.error("Error al guardar el carrito:", error);
            throw error;
        }
    }


async addItem(id, productId) {
    try {
        // Obtener el carrito con el id proporcionado
        const cart = await this.getCartId(id);

        // Convertir el carrito a un objeto plano
        const cartPlainObject = cart.toObject();

        // Buscar el índice del producto en el carrito
        const index = cartPlainObject.productosCarrito.findIndex(item => item._id == productId);

        // Si el producto ya está en el carrito, incrementar su cantidad
        if (index >= 0) {
            cartPlainObject.productosCarrito[index].quantity++;
        } else {
            // Si el producto no está en el carrito, añadirlo
            cartPlainObject.productosCarrito.push({ _id: productId, quantity: 1 });
        }

        // Actualizar el carrito en la base de datos con el objeto plano modificado
        await carritoModel.updateOne({ _id: id }, cartPlainObject);

        // Retornar el carrito como un objeto Mongoose Document
        return cart;
    } catch (error) {
        console.error("Error in addItem: ", error);
        throw error;
    }
}


}





module.exports = Carrito