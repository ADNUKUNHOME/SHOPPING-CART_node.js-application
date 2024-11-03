var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  let products = [
    {
      name:"Wooden Guitar",
      description:"This is a beautyfull wooden guitar.",
      image:"https://media.ipassio.com/media/ckeditor_image/2022/12/05/guitar.jpg"
    },
    {
      name:"Golden Guitar",
      description:"This is a beautyfull wooden guitar.",
      image:"https://media.istockphoto.com/id/1399610550/photo/rock-electric-guitar-in-rich-golden-color.jpg?s=612x612&w=0&k=20&c=VPHeNn7990-VlecQazswSb6iiDW4tSYYu7SE5HO619c="
    },
    {
      name:"Red Guitar",
      description:"This is a beautyfull wooden guitar.",
      image:"https://www.shutterstock.com/image-photo/red-electric-guitar-isolated-on-260nw-2300954933.jpg"
    },
    {
      name:"Black Guitar",
      description:"This is a beautyfull wooden guitar.",
      image:"https://wallpapers.com/images/featured/guitar-vtvn8855v2zafbtj.jpg"
    }
  ]
  res.render('index', { products });
});

module.exports = router;
