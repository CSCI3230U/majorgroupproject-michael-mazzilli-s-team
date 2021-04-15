var express = require('express');
var path = require('path');

//Database imports
var mongoose = require('mongoose');
var userModel = require('./models/user_model.js');
var postModel = require('./models/post_model.js');

var default_router = require('./routes/index');
var getuser = require('./routes/getuser');
var getpost = require('./routes/getpost');

var app = express();

//connect to mongodb
const uri = "mongodb+srv://jkaterberg:sc5RvWag5alW27Ot@cluster0.jbb5v.mongodb.net/tweetbook?retryWrites=true&w=majority";
mongoose.connect(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}, function(error){
	if(error){
		console.log("Could not connect to database");
	}else{
		console.log("Connected to MongoDB");
	}
})

//Routing
app.use(default_router);
app.use(getuser);
app.use(getpost);

//start the application
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function(){
	console.log(`Listening for requests on port ${app.get('port')}`)
});
