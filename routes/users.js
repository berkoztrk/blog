var express = require('express');
var router = express.Router();
var adminUser = require('../config/adminuser')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  console.log(req.sessionID);
  res.render('users/login');
});

router.post('/login', function(req, res, next) {

    var localLoginSuccessful = adminUser.loginAdmin(req.body.username,req.body.password);
    if(localLoginSuccessful) {
      req.session.user = { username : req.body.username, password:req.body.password};
      res.render('index');
    }
    else{
      res.render('users/login',{failureMessage : 'Invalid user'});
    }

});

module.exports = router;
