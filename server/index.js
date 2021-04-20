//General imports
var express = require('express');
var cors = require('cors');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('./config.json'));

//Auth imports
let verifyToken = require('./middleware/authorize');

//Database imports
var mongoose = require('mongoose');
var Users = require('./models/user_model');
var Posts = require('./models/post_model');
var Logins = require('./models/login_model');
var Comments = require('./models/comment_model');

//router imports
var default_router = require('./routes/index');
var getuser = require('./routes/getuser');
var getpost = require('./routes/getpost');
var adduser = require('./routes/adduser');
var login = require('./routes/login');
var addfriend = require('./routes/addfriend');
var submitpost = require('./routes/submitpost');
var submitcomment = require('./routes/submitcomment');
var getcomment = require('./routes/getcomment');
var updateuser = require('./routes/updateuser');

var app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//connect to mongodb
mongoose.connect(config.db_uri, {
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
app.use(adduser);
app.use(login);
app.use(getcomment);
app.use(verifyToken, addfriend);
app.use(verifyToken, submitpost);
app.use(verifyToken, submitcomment);
app.use(verifyToken, updateuser);

//start the application
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function(){
	console.log(`Listening for requests on port ${app.get('port')}`)
});