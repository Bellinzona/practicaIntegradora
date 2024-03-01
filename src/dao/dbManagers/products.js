const userModel = require("../models/user.model")

class Users {
    constructor(){

    }

    async getAll(){
        let users = await userModel.find().lean()
        return users
      
        
    }

    async getProductId(id){
      let users = await userModel.find({_id: id}).lean()
      return users[0]
      
  }


   async updateProduct(id,newItem){
    await userModel.updateOne({_id: id }, newItem)
    
}

   async saveProduct(user){
    let result = await userModel.create(user)
    return result
        

    }

   async deleteProduct(id){
      await userModel.deleteOne({_id : id})
          
  
      }
}




module.exports = Users