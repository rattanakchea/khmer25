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
	},

	// middleware check if you authenicated
	auth: function(req, res, next){
		var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || (req.headers['x-access-token']);

		if (token){
			try{
				var decoded = jwt.decode(token, secret());

	  			if (decoded.exp <= Date.now()){
	  				res.status(401).json({
	  					'status': 401,
	  					'message': 'Token Expired'
	  				});
	  				return;
	  			}

	  			User.findOne({_id: decoded.iss}, function(err, user){
	  				if (err){
	  					res.status(500);
	  					res.json({
	  						'status': 500,
	  						'message': 'Internal Error'
	  					});
	  					return;
	  				}

	  				if (!user){
	  					res.status(401);
	  					res.json({
	  						'status': 401,
	  						'message': 'Invalid User'
	  					});
	  					return;
	  				}

	  				next();
	  			});
			}catch(err){
				res.status(500).json({
	  				'status': 500,
	  				'message': 'Oops something went wrong',
	  				'error': err
	  			});	
			}
		}else{
			res.status(401).json({
	  			'status': 401,
	  			'message': 'Invalid Token or Key'
	  		});
	  		return;
		}
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