const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const postSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    stars:{
        type: Number,
        require: true,
        min: 0,
        max: 5
    },
    comments:{
        type: String,
        required: true,
        maxlength: 200
    },
    photo:{
        type: String
    },
    likes:{
        type: Number
    },
    postBy:{
        type: ObjectId,
        ref:"User"
    },
    likes:[{
        type: ObjectId,
        ref: "User"
    }]
},{timestamps:true})

var Post = mongoose.model('Post', postSchema)
module.exports = Post;