const { Router } = require("express")
const Carrito = require("../dao/dbManagers/carrito")




const router = Router()

const manager = new Carrito()


router.get("/", async (req, res) => {

    try {
        const todosCarrito = await manager.getAll()
        res.status(201).send(({status:"success", todosCarrito}))
    } catch (error) {
        res.status(500).send({ error: "No se pudo obtener los carritos." });

    }

    
});


router.post("/", async (req, res) => {

    try {
        const nuevoCarrito = await manager.saveCart(req.body);
        res.status(201).send({ status: "success", nuevoCarrito });
    } catch (error) {
        res.status(500).send({ error: "No se pudo crear el carrito." });
    }

  

})


router.post("/:productId/enCarrito/:cartId", async (req, res) => {

    const productId = req.params.productId
    const cartId = req.params.cartId

    await manager.addItem(cartId,productId)

    res.status(201).send({ status: "success" });



   

})




module.exports = router