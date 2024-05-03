const express = require('express')
const path = require('path')
const dbConnection = require('./src/config/db')
const userRouter = require('./src/routes/user.routes')
const cors = require('cors')
const productRouter = require('./src/routes/product.routes')
const app = express()
require('dotenv').config()

let port = process.env.PORT || 4000

app.use(cors())

// for ejs
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))

// for tailwind css
app.use(express.static(path.join(__dirname,'public')));

//middleware
app.use(express.json())
//home route
app.get('/',(req,res)=>{
  return res.render("index",{name:"Home"})
})

// all routes
app.use('/user',userRouter)
app.use('/products',productRouter)

app.listen(port,async()=>{
  try {
    dbConnection()
    console.log(`server is running on port ${port}`)
  } catch (error) {
    console.log("error in listen port")
  }

})