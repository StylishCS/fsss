const bcrypt = require('bcrypt');
var passwordValidator = require('password-validator');
var schema = new passwordValidator();
const Signup = require('../models/signups');

schema.is()
.min(8)
.is().max(255)
.has().uppercase()
.has().lowercase()
.has().digits(2)
.has().not().spaces();

async function postSignup(req,res){
    const temp = await Signup.findOne({username: req.body.name});
    const temp2 = await Signup.findOne({email: req.body.email});
    if(temp||temp2){
        res.send('user already exist');
    }
    else{
        if(req.body.password == req.body.confirmPassword){
            const flag = schema.validate(req.body.password);
            if(flag){
                let cred = new Signup({
                    username: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                })
                const salt = await bcrypt.genSalt(10);
                cred.password = await bcrypt.hash(cred.password, salt);
                cred = await cred.save();
                res.send('ok');
            }
            else{
                res.send('password should contain : 1 lowercase, 1 uppercase, 2 digits, no spaces, length of 8');
            }
            
        }
        else{
            res.send("passwords doesn't match");
        }
    }
    }
module.exports = {/*getSignup,*/ postSignup};