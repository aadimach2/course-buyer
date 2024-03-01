const { Router } = require("express");
const router = Router();
const mongoose = require('mongoose');

const userMiddleware = require("../middleware/user");
const {User,Course} = require("../db");


router.post('/signup',async (req, res) => {
    // Implement user signup logic
try{

    await User.create({
        username:req.body.username,
        password:req.body.password
    })
    res.json({
        message:"user created successfuly"
    })
} catch(error){
console.log(error);
res.json({"msg":error});
}

});

router.get('/courses',async (req, res) => {
    // Implement listing all courses logic
    const response=await Course.find({})
    res.json({
        courses:response
    })

});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId=req.params.courseId;
    const username=req.headers.username;
    try{
        await User.updateOne({
        username:username
    },{"$push":
       {
        purchasedCourses:courseId
        }

    })
    } catch(e){
    console.log(e)
    };
    res.json({
        message:"Purchase complete "
    })



});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router