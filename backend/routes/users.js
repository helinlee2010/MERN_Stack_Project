const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
let User = require('../models/user.model')
const requireLogin = require('../middleware/requireLogin')

//Get all the users
router.route('/').get((req, res)=>{
    User.find()
        .then(users => {res.json(users)})
        .catch(err=>res.status(400).json('Error: ' + err));
});
// router.route('/add').get((req,res)=>{
//     res.send("Add User Page");
// });

router.route('/add').post((req, res) => {
    // Find if the username already exist
    const { username, password } = req.body;
    User.findOne({username: username}).then( existedUser => {
        if(existedUser){
            return res.status(400).json({ success: false, msg: "This username already exist. Please choose another one."});
        }else{
            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const newUser = new User({
                        username: username,
                        password: hashedPassword
                    })
                    newUser.save()
                        .then(()=>res.json({
                            success:true,
                            msg: "A new user has just been created!"
                        }))
                        .catch( err => res.status(400).json({success:false, msg: err})) 
                        // OR console.log(err)
                })
        }
    });
});



// Login 
router.route('/login').post((req, res)=> {
    const { username, password } = req.body;
    User.findOne({ username: username }, (err, savedUser) =>{
        if(!savedUser){
            return res.status(404).json({
                success: false,
                msg: "Invalid username or password."
            });
        }
        if(err){
            return res.status(400).json({
                success: false,
                msg: err
            });
        }else{
            // Withou encrypting:
            // const matchResult= password.localeCompare(loggingUser.password);
            // if(matchResult === 0){
            //     return res.status(200).json({
            //         success: true,
            //         msg: "Username & password matched, logging in..."
            //     }); }else{...}
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if(doMatch){
                        // JWT
                        const token = jwt.sign({_id: savedUser._id}, JWT_SECRET)
                        const {_id, username} = savedUser;
                        return res.status(200).json({
                            success: true,
                            msg: "Success! Logging in",
                            token: token,
                            user: {_id, username}
                        })
                    }else{
                        return res.status(401).json({
                            success: false,
                            msg: "Invalid username or password"})
                    }
                })
        }
    });
});


// Protected content: only visible after login
router.get('/protected', requireLogin, (req, res)=>{
    res.status(200).json({user: req.user})
})

module.exports = router;