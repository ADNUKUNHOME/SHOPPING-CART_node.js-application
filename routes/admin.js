var express = require('express');
const { render } = require('../app');
var router = express.Router();
var productHelpers = require('../helpers/product-helpers')


/* GET users listing. */
router.get('/', function(req, res, next) {

    productHelpers.getAllProducts().then((products) => {
      
      res.render('admin/view-products' ,{ admin:true, products })

    });

});

router.get('/add-product', (req,res) => {
    res.render('admin/add-product')
});

router.post('/add-product', (req, res) => {
  productHelpers.addProduct(req.body, (id) => {
    let image = req.files.Image;

    image.mv('./public/product-images/'+id+'.png', (err) => {
      if (!err)     res.render('admin/add-product');
      else console.log(err);

    })
  });
});

router.get('/delete-product/:id', (req, res) => {
  let proId = req.params.id;
  console.log(proId)
  productHelpers.deleteProduct(proId).then((response) => {
    res.redirect('/admin/');
  })
})

module.exports = router;
