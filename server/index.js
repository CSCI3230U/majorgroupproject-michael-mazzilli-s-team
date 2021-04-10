var express = require('express');
var path = require('path');

var router = require('./routes/index');

var app = express();

//Routing
app.use('/', router)

//TODO: Setup routing to the application endpoints. Was thinking put each route in separate file in ./routes
//TODO: Setup and connect to mongoDB

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), function(){
	console.log(`Listening for requests on port ${app.get('port')}`)
});
