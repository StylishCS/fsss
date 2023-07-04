const Signup = require('../models/signups');
const bcrypt = require('bcrypt');


async function getLogin(req, res, next) {
    await res.sendFile('login.html', { root: 'S:/mernstack-project/public/login' })
  }

async function checkLogin(req,res){
  const loginCred = {
    email: req.body.email,
    password: req.body.password
  }

  const temp = await Signup.findOne({email: req.body.email});
  const keep = req.body.keep;
  
  if(temp){
    const flag = await bcrypt.compare(req.body.password, temp.password);
    if(temp.email == loginCred.email && flag){
      res.status(200).redirect('http://localhost:3000');//dashboard
      if(keep){
        var cookies = req.cookies; 
        res.setCookie('my-new-cookie', 'Hi There');
      }
    }
    else{
      res.redirect('http://localhost:3000/login');
    }
  }
  else{
    res.redirect('http://localhost:3000/login');
  }

  }
module.exports = {getLogin, checkLogin};
