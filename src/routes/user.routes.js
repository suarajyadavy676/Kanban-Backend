const {Router} = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserData = require('../models/user.model')

let userRouter = Router()

userRouter.post('/register',async(req,res)=>{
  try {
    const {email,password,username,role} = req.body
    let user = await UserData.find({email})
    if(user){
      return res.send("user already present")
    }
    bcrypt.hash(password,10, async function(err, hash) {
      // Store hash in your password DB.
      if(err){
        return res.status(400).send("hashing error")
      }  
      await UserData.create({username,email,password:hash,role})
      return res.send("user register successfully")
  });
  } catch (error) {
    return res.status(500).send("server error in register time")
  }
})

userRouter.post('/signIn',async(req,res)=>{
  let {email}=req.body
  let user = await UserData.findOne({email})
  let payload = {
    name:user._id,
    email:user.email
  }
  console.log(process.env.JWT_SECRET)
  try {
    if(!user){
      return res.send("please register")
    }else{
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if(err){
          return res.send("wrong password")
        }
        let token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"1h"})
        return res.send({token,messege:"Sign in successfully"})
    })
    }
  } catch (error) {
    return res.status(500).send("server error in signIn time")
  }
})

module.exports = userRouter