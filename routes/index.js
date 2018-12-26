const express = require('express');
const router = express.Router();
const blogService = require("../services/blogService")

router.get('/', function(req, res, next) {
  blogService.getAll().then((blogs) => {
    res.render('index', { blogs: blogs});
  }).catch((err) => {
    res.render("error");
  })
});

router.get('/search',(req,res,next) => {
  var query = req.query.q;
  blogService.search(query).then((blogs) => {
    res.render('search',{blogs: blogs});
  }).catch((err) => {
    res.render("error");
  });
});

module.exports = router;
