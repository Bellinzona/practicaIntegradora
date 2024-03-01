const { Router } = require("express")
const Users = require("../dao/dbManagers/products")
const { route } = require("./products.router")



const router = Router()

const manager = new Users()


router.get("/", async (req, res) => {
    const users = await manager.getAll()
    res.send({ status: "sucess", users })
})


router.get("/:id", async (req,res) => {
    const productId = req.params.id

    const product = await manager.getProductId(productId)


    res.send({ status: "sucess", product })
})


router.post("/", async (req, res) => {

    if (!req.body.titulo || !req.body.descripcion || !req.body.precio || !req.body.codigo || !req.body.status || !req.body.stock   ) {
        res.status(404).send({ status: "error" })
    } else {
        await manager.saveProduct(req.body)
        res.send({ status: "sucess" })

    }



})

router.put("/:id", async (req, res) => {
    const id = req.params.id
    await manager.updateProduct(id,req.body)

    res.send({status: "success"})
})

router.delete("/:id", async (req,res) => {
    const id = req.params.id
    await manager.deleteProduct(id)

    res.send({status: "success"})
})




module.exports = router