// include the authorization controller
var Auth = require('./controllers/auth');
// include the user model
var User = require('./models/user');




// sets routes
module.exports = function(app){
	app.post('/signup', Auth.signup)
}