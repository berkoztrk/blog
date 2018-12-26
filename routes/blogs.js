const express = require('express');
const router = express.Router();
const blogService = require("../services/blogService")

/* GET home page. */
router.get('/list', function(req, res, next) {
    blogService.getAll().then((blogs) =>{
      res.render('blogs/list', {blogs: blogs});
    }).catch((err) => {
      res.render('error')
    });
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
    res.render('blogs/create'); 
});

router.post('/create',function(req,res,next){
    const blog = req.body;
    blogService.insert(blog).then((blog) => {
      blogService.getAll().then((blogs) => {
        res.render('blogs/list', { Message: 'Blog saved.',blogs: blogs });
      })
    }).catch((err) => {
      res.render('error')
    });
});

router.get('/edit/:id', function(req, res, next) {
  if(req.params.id){
     blogService.getById(req.params.id).then((blog) => {
      res.render('blogs/edit', { blog : blog });
     }).catch((err) => {
      res.render('error')
     });
  }
  else
    res.render('error'); 
});

router.post('/edit', function(req, res, next) {
  const blog = req.body;
  blogService.update(blog).then((blog) => {
    blogService.getAll().then((blogs) => {
      res.render('blogs/list', { Message: 'Blog saved.',blogs: blogs });
    })
  }).catch((err) => {
    res.render('error')
  });
});

router.get('/delete/:id', function(req, res, next) {
  if(req.params.id){
    blogService.delete(req.params.id).then((blog) => {
      blogService.getAll().then((blogs) => {
        res.render('blogs/list', { Message: 'Blog deleted.',blogs: blogs });
      })
    }).catch((err) => {
      res.render('error')
    });
  }
  else
    res.render('error'); 
});

module.exports = router;
