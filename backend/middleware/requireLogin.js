const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const User = require('../models/user.model');

module.exports = (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({
            success: false,
            msg: "Not logged in yet, unauthorized"
        })
    }else{
        const userToken = authorization.replace('Bearer ','')
        // Use JWT to verify
        jwt.verify(userToken, JWT_SECRET, (err, payload)=>{
            if(err){
                return res.status(401).json({
                    success: false,
                    msg:'Invalid token.'
                })
            }else{
                const { _id } = payload
                User.findById(_id)
                    .then(userData => {
                        //why req.user?
                        //can be req.anyname, but must match with protected part in router
                        req.user = userData
                        next()
                    })
            }
        })
    }
} 