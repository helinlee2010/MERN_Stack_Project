const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
let Post = require('../models/post.model')

// Get all the post
router.get('/all', (req,res)=>{
    Post.find()
    .populate('postBy', 'username') //?
    .sort('-createdAt')  //prefix with - :descending, so newest first
    .then(post=> res.json(post))
    .catch(err=> res.json({err}))
})

// Create post
router.post('/create',requireLogin, (req, res)=>{
    const { name, stars, comment, imgUrl } = req.body
    
    req.user.password = undefined;
    req.user.createdAt = undefined;
    req.user.updatedAt = undefined;
    req.user.__v= undefined;

    const newPost = new Post({
        name: name,
        stars: stars,
        comments: comment,
        photo: imgUrl,
        postBy: req.user
    })
    newPost.save()
        .then(result=> res.json({ post: result }))
        .catch( err => console.log(err) )
})

// Check all my post
router.get('/mypost', requireLogin, (req, res)=>{
    Post.find({postBy: req.user._id})
    .populate('postBy', '_id username')
    .then( mypost => res.json(mypost) )
    .catch ( err => res.json({
        success: false,
        msg: err
    }))
})


// Likes ( Update request )    
router.put('/like', requireLogin, (req, res)=>{

    Post.findByIdAndUpdate(req.body.postId, { 
        $push: {likes:req.user._id} 
    }, {new: true}).exec((err, result) => {
        if(err){
            return res.status(422).json({success: false, msg: err})
        }else{
            res.status(200).json({
                success: true,
                result: "You liked the post"
            })
        }
    })
})

// Cancel likes: unlike
router.put('/unlike', requireLogin, (req, res)=>{
    Post.findByIdAndUpdate( req.body.postId, { $pull: {likes: req.user._id} }, { new: true}).exec((err, result)=>{
        if(err){
            return res.status(422).json({success:false, msg: err})
        }else{
            res.status(200).json({
                success: true,
                result: "You unliked the post."
            })
        }
    })
})


module.exports = router;