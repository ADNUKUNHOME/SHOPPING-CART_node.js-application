var express = require('express');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers');
var userHelpers = require('../helpers/user-helpers');
const { response } = require('../app');
var toLoggin = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  }else {
    res.redirect('/login');
  }
}


/* GET home page. */
router.get('/', function(req, res, next) {

  let user = req.session.user

  productHelpers.getAllProducts().then((products) => {

    res.render('user/view-products' ,{ products, user })

  });

});

router.get('/login', (req, res) => {

  if (req.session.loggedIn) {
    res.redirect('/')
  }else{
      res.render('user/login', {'loggErr': req.session.loggErr});
      req.session.loggErr = false;
  }
});

router.get('/signup', (req, res) => {
  res.render('user/signup')
});

router.post('/signup', (req,res) => {

  userHelpers.doSignup(req.body).then((response) => {
  console.log(response);
  })
});

router.post('/login', (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
  
    if (response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.redirect('/');
    }else {
      req.session.loggErr = "Invalid username or password."
      res.redirect('/login');
    }
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/')
})

router.get('/cart', toLoggin, (req, res) => {
  res.render('user/cart');
})

module.exports = router;
