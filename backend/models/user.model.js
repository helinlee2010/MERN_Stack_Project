const mongoose = require('mongoose');

// Each schema maps to a MongoDB collection
// & defines the shape of documents within that collection.
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim:true,
        minlength:6
    },
    password: { type: String, required:true, minlength:6 }
}, {timestamps: true});

// Conver schema into a model we can work with
// First param: ModelName
const User = mongoose.model("User", userSchema);

module.exports= User;