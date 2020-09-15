const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));



// Connect to mongoDB database
//Store mongoDB connection string as a variable in .env
const mongoose = require('mongoose');
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
    useNewUrlParser:true,
    useUnifiedTopology: true 
});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB connected!");
})

app.get('/', (req,res) =>{
    res.send("GET request to homepage")
})

// Routers
const userRouter = require('./routes/users');
app.use('/users', userRouter);

const postRouter = require('./routes/post');
app.use('/post', postRouter);


app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});