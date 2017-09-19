var User = require('../models/user');


exports.signup = function(req, res, next){

	var email = req.body.email;
	var password = req.body.password;

	User.findOne({ email: email }, function(err, existingUser){
		if(err){
			return next(err);
		}

		if(existingUser){
			//return res.status(418).send(err)
			return res.status(418).send("Email is in use");
		}

		var user = new User({
			email: email,
			password: password
		});

		user.save(function(err){
			if(err) { return next(err); }
			// respond to request indicating the user was created
			res.json({success: true});
		});
	});
}
//console.log(req.body);


