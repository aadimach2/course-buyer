const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const {Admin,Course}=require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async(req, res) => {

    // Implement admin signup logic
    const username =req.body.username;
    const password=req.body.password;

    await Admin.create({
        username:username,
        password:password

    })
    res.json({
        message:"Admin created successfully"
    })
    //

});

router.post('/courses', adminMiddleware,async (req, res) => {
    // Implement course creation logic
    const title=req.body.title;
    const description=req.body.description;
    const imageLink=req.body.imageLink;
    const price=req.body.price;
    
    const newCourse=await Course.create({
        title,
        description,
        imageLink,
        price
    })
    console.log(newCourse)
    res.json({
        message:'Course created successfully',courseId:newCourse._id
    })

});

router.get('/courses', adminMiddleware ,async(req, res) => {
    const response=await Course.find({})
    res.json({
        courses:response
    })
    // Implement fetching all courses logic
    
});

module.exports = router;