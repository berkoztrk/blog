const express = require('express');
const router = express.Router();
const blogService = require("../services/blogService")

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/content/:id',(req,res,next) => {

  if('id' in req.params){
    const id = req.params.id
    blogService.getById(id).then(function(blog){
      res.render('blogs/index', blog);
    }).catch(function(err){
        res.render('error')
    });
  }
  else
    res.render('error')
});

router.get('/create', function(req, res, next) {
    res.render('blogs/create', { title: 'Express' });
});

router.post('/create',function(req,res,next){
    const blog = req.body;
    blogService.insert(blog).then((blog) => {
      res.render('blogs/create', { Message: 'Blog saved.' });
    }).catch((err) => {
      res.render('error')
    });
});

module.exports = router;
