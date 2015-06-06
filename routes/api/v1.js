var express = require('express');
var router = express.Router();
var authentication = require('./../../authentication/authentication');

var User = require('./../../models/user')

router.get('/', function(req, res){
	res.send('hello world');
});

router.get('/adduser', function(req, res){
	var user = new User();
	user.firstname = "jimmy";
	user.lastname = "kiss";
	user.email = "jimmy@kiss.com";
	user.password = "123456";

	user.save(function(err, jimmy){
		if (err){
			res.status(500).json({
				'status': 500,
				'message': 'Internal Error'
			});
			return;
		}

		res.json(user);
	});
});

// login api
router.post('/login', authentication.login);

module.exports = router;