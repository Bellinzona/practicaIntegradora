const mongoose = require("mongoose")


const messageSchema = new mongoose.Schema({

    usuario: {
        type: String
    },
    mensaje: {
        type: String
    }
})

const messageModel = mongoose.model("message", messageSchema)



module.exports = messageModel