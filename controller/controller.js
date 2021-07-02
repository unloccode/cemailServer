const db = require('../config/db.config.js');
const User = db.User;

exports.createUser = (req, res) => {
    let user = {};
    try{
        //build user object
        user.email = req.body.email;
        user.confirmed = req.body.confirmed;
        //save to db
        User.create(user, {
            attributes: [
                'id',
                'email',
                'confirmed'
            ]
        }).then(result=>{
            res.status(200).json(result);
        });
    }catch(error){
        res.status(500).json({
            message: "Fail",
            error: error.message
        });
    }
}