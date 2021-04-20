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

const Messages = require('./models/message_model');
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



/* 	*	*	*	*	*	*	*	*	*	*
 * 			CHAT COMPONENT				*
 *	*	*	*	*	*	*	*	*	*	*/
// Map users => sockets
var sockets = {}

// Maps sockets => users
var users = {}

// Listen for socket.io connections
const io = require("socket.io")(3001, {
	cors: {
	  origin: "*",
	  methods: ["GET", "POST", "OPTION"]
	}
});


// Called when a user connects to the server
io.on("connection", socket => {
	console.log("Connection established")

	socket.emit("getUID")

	// Whenever we receive a request to send a message, perform the following
	socket.on("sendMessage", function(sender, receiver, message) {
		console.log(sender, "=>", receiver, ": message sent")
		
		const newMessage = new Messages({
			sender: sender,
			receiver: receiver,
			user: message.user,
			text: message.text,
			timestamp: message.datetime
		})

		// Save the message then send the updated messages to the partner
		newMessage.save(function (err, messages) {
			console.log("saving message: ", messages)
			if (err) return console.error(err)
			updateMessages(sender, receiver)
		})
	});

	// Called when a user would like to update their chat window with msgs (new window)
	socket.on("getMessages", function(user, partner) {
		console.log("getMessages request received from", user, " to ", partner)
		var query = Messages.find({$or:[
			{'sender':user, 'receiver':partner},
			{'sender':partner, 'receiver':user}
		]})
	
		// Send both users an updated messages list
		query.exec(function (err, messages) {
			socket.emit("getMessages", messages)
		})
	});

	// Called to update a users friends pane in the chat window
	socket.on("getLastMessage", function(user, friend) {
		// Get the most recent message
		var query = Messages.find({$or:[
			{'sender':user, 'receiver':friend},
			{'sender':friend, 'receiver':user}
		]}).sort({timestamp: -1}).findOne()
	
		// Send the most recent message and the friend object so we can create the message
		query.exec(function (err, message) {
			var friend_query = Users.findOne({'username' : friend})
			friend_query.exec(function (err, f) {
				console.log("GLM:", f, friend)
				socket.emit("getLastMessage", f, message)
			})
		})
	});

	// Called when a user disconnects
	socket.on("disconnect", function() {
		delete sockets[users[socket]]
		delete users[socket]
	});

	// Called when a user connects; stores a reference from the user to their active socket
	socket.on("login", function(uid) {
		// Get user/socket references so we can lookup sockets for message passing
		sockets[uid] = socket
		users[socket] = uid
	})

	// Return a list of accounts that the user is friends with
	socket.on("getFriends", function() {
		var query = Users.findOne({username : users[socket]})
		let friends_list = []
		query.exec(function (err, user) {
			for (let i = 0; i < user.friends.length; i++) {
				var friend_query = Users.findOne({_id : user.friends[i]})
				friend_query.exec(function (err, f) {
					friends_list.push(f)

					if (i == user.friends.length - 1) {
						socket.emit("getFriends", friends_list)
					}
				})
			}
		})
	})
});

function userFromName(username) {
	var friend_query = Users.findOne({'username' : username})
	friend_query.exec(function (err, f) {
		return f
	})
}

/*	When a user sends a message to their conversation partner, we'd like to
 *  send them a message with the updated messages for that conversation.
 */
function updateMessages(user, partner) {
	var query = Messages.find({$or:[
		{'sender':user, 'receiver':partner},
		{'sender':partner, 'receiver':user}
	]})

	// Send both users an updated messages list
	query.exec(function (err, messages) {
		if (partner in sockets) {
			console.log("sending messages to ", partner)
			sockets[partner].emit("receiveMessages", messages)
		} else {
			console.log("partner not found")
		}
	})

	// Don't send it to ourself (testing)
	if (user !== partner){
		if (user in sockets) {
			console.log("sending messages to ", user)
			sockets[user].emit("receiveMessages", messages)
		} else {
			console.log("user not found")
		}
	}
}