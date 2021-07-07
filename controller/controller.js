const db = require('../config/db.config.js');
const User = db.User;
//const User = require('../models/user.model.js');
const {Base64} = require('js-base64');

const sendEmail = require('../email/email.send')
const msgs = require('../email/email.msgs');
const templates = require('../email/email.templates');

exports.createUser = (req, res) => {
    let user = {};
    try{
        //build user object        
        user.email = req.body.email;
        user.confirmed = req.body.confirmed;
        //check if new?
        User.findOne({where: {email: user.email}})
        .then(person=>{
            //if new user person send a fresh link
            if(!person){                
                //save to db
                User.create(user, {
                    attributes: [
                        'id',
                        'email',
                        'confirmed'
                    ]
                }).then(msee=>{
                    //console.log(msee.id);
                    //console.log(Base64.encode(String(msee.id)));
                    sendEmail(msee.email, templates.confirm(Base64.encode(String(msee.id))))
                }).then(()=>res.json({msg: msgs.confirm}))
            }else{
                //existing user
                console.log(person.id);
            }
        })
    }catch(error){
        res.status(500).json({
            message: "Fail",
            error: error.message
        });
    }
}

exports.allUsers = (req, res) => {
    //find all customer information from
    try{
        User.findAll({
            attributes: [
                'id',
                'email',
                'confirmed'
            ]
        }).then(users=>{
            res.status(200).json(users);
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: "Error",
            error: error
        });
    }
}