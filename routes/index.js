const express = require('express');
const router = express.Router();
const blogService = require("../services/blogService")

/* GET home page. */
router.get('/', function(req, res, next) {
  blogService.getAll().then((blogs) => {
    res.render('index', { blogs: blogs});
  }).catch((err) => {
    res.render("error");
  })
});

module.exports = router;
