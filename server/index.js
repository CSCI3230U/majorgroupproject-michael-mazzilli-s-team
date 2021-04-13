var express = require('express');
var path = require('path');

//Database imports
var mongoose = require('mongoose');
var userModel = require('./models/user_model');
var postModel = require('./models/post_model');

var router = require('./routes/index');

var app = express();

//TODO: Setup and connect to mongoDB
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
app.use('/', router);

//TODO: Setup routing to the application endpoints. Was thinking put each route in separate file in ./routes

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function(){
	console.log(`Listening for requests on port ${app.get('port')}`)
});
