const express = require("express")
const port = 8080
const app = express()
const ProductsRouter = require("./routes/products.router")
const carritoRouter = require("./routes/carrito.router")
const viewsRouter = require("./routes/views.router")
const handlebars = require("express-handlebars")
const mongoose = require("mongoose")
const { Server } = require("socket.io")
const messageModel = require("./dao/models/message.model")







mongoose.connect("mongodb+srv://mtbellinzona:NNCrtzeP4pkmXAlR@cluster0.8vsrtxc.mongodb.net/ecommerce").then(() => {   // para especificar la base de datos que queres usa
                                                                                                             //  tenes que poner el nombre de la db despues del /
    console.log("conectado")
})





app.engine("handlebars", handlebars.engine())
app.set("views", `${__dirname}/views`)
app.set("view engine", "handlebars")


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(`${__dirname}/public`))

app.use((req, res, next)=>{
    req.io = io; 
    next();
})

const serverHttp = app.listen(port, ()=>console.log(`Server running on port ${port}`));

const io = new Server(serverHttp)


io.on("connection", async (socket) => {
    


    socket.on("Nuevomensaje", async (data) => {
        console.log(data)
         await messageModel.create(data)
         let mensaje = await messageModel.find().lean()
        io.emit("mensajesHistorial", {mensaje})

    })



    
})









app.use("/api/products", ProductsRouter)
app.use("/api/carrito", carritoRouter )
app.use("/", viewsRouter)

