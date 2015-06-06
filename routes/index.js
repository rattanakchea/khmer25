var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Get about page
router.get('/about', function(req, res){
	res.json({
		'message': 'this is about page!'
	});
});

module.exports = router;
