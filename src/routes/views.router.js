const {Router} = require("express")
const Users = require("../dao/dbManagers/products")



const router = Router()


const manager = new Users


router.get("/chat", async (req,res) => {
    res.render("chat", {})
})



module.exports = router