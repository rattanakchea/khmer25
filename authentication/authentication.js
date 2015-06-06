var jwt = require('jwt-simple');
var secret = require('./../config/secret');
var User = require('./../models/user');

var authentication = {
	login: function(req, res){
		var email = req.body.email || '';
		var password = req.body.password || '';

		// invalid inputs
		if (email == ' ' || password == ' '){
			res.status(401).json({
				'status': 401,
				'message': 'Invalid Credentials'
			});
			return;
		}

		// check db for that user
		User.findOne({email: email}, function(err, user){
			if (err){
				res.status(500).json({
					'status': 500,
					'message': 'Internal Error'
				})
				return;
			}

			// Invalid credential
			if (!user || user.password != password){
				res.status(401).json({
					'status': 401,
					'message': 'Invalid Credentials'
				});
				return;
			}

			res.json(genToken(user));
		});
	}
}

function genToken(user){
	var expires = expiresIn(30); // exipired in 30 minutes
	var token = jwt.encode({
			exp: expires,
			iss: user._id
		}, secret());

	user.password = '';

	return {
		token: token,
		expires: expires,
		user: user
	}
}

function expiresIn(minutes){
	var dateObj = new Date();
	return dateObj.getTime() + minutes*60000;
}


module.exports = authentication;