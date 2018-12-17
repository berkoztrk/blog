var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  console.log(req.sessionID);
  res.render('users/login');
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err,user,info) {
    if(err || !user) {
      res.render('users/login',{failureMessage : 'Invalid user'});
    }
    else{
      res.session.user = user;
      res.render('/index');
    }
  }(req,res,next));
});

module.exports = router;
