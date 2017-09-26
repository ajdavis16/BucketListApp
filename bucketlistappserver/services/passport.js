const passport = require('passport');
const User = require('../models/user.js');
const config = require('../config.js');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//create  local strategy
let localOptions = {usernameField: 'email'};
let localLogin = new LocalStrategy(localOptions, function(email, password, done){
	User.findOne({email: email}, function(err, user){
		if (err) {return done(err);}
		if(!user) {return done(null, false);}

		//compare passwords = is 'password' equal to user.password?
		//compare pw from req with users saved passwrod
		user.comparePassword(password, function(err, isMatch){
			if (err) {return done(err);}
			//if it's not the same, it will return false and saw they didn't match up.
			if (!isMatch) {return done(null, false);}
			//if same, it will call passport callback with user model
			return done(null, user);
		});
		//tricky part -> we salted the password, and we need to somehow decode encrypted password to
		//normal password

	});
	//Otherwise, call done with false

});

let jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

//create jwt strategy
let jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
	//On payload we have sub property. Use the uer model, look through all the users and find user with the id
	User.findById(payload.sub, function(err, user){
		//In the fundById callback, we will get two arguments err and user. Err is going to be populated only if
		//search fails.
		if (err) {return done(err, false);}	
		//If we can find the user, pass it to done callback. They are authenticated.
		if (user) {
			done(null, user);
		} else {
			//if we cannot find the user with id, we are going to call done function without the user object.
			done(null, false);
		}
	});
});

passport.use(jwtLogin);
passport.use(localLogin);