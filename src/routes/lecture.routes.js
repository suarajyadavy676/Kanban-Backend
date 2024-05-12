const {Router} = require('express')
const Lecture = require('../models/lecture.model')

let lectureRouter = Router()

lectureRouter.post('/',async(req,res)=>{
  console.log(req.body)
  try {
    await Lecture.create(req.body)
    return res.json({mes:"data created successFully"})
  } catch (error) {
    console.log("error in server")
    return res.status(500).send("server side error")
  }
})
 lectureRouter.get('/',async(req,res)=>{
  try {
    let data = await Lecture.find()
    console.log(data)
    return res.send(data)
  } catch (error) {
    return res.status.send("server side error")
  }
 })
module.exports = lectureRouter