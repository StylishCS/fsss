var express = require('express');
var router = express.Router();
const {/*getSignup,*/ postSignup} = require('../controllers/signupController');

/* GET home page. */
//router.get('/', getSignup);
router.post('/', postSignup);
  
module.exports = router;
