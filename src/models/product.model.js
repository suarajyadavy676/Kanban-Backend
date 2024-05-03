const {Schema,model} = require('mongoose')
let productSchema = new Schema({
  name:{type:String,required:true},
  detail:{type:String,required:true,},
  price:{type:String,required:true},
  hero:{type:String},
  image:String,
  info:String
})

let Product = model('Product',productSchema)

module.exports =  Product