# TweetBook API
This is an overview of all the functionality currently implemented in the tweetbook API. Every endpoint is listed along with its function and parameters.

***Running the server***: 
- `nodemon` for autoreload on save, 
- Otherwise `node index.js`

## `<domain>/adduser`
### POST
Adds user with the given information into the database. Generates a uuid and a profile picture.

_Requires an access token to be used_

**Required Parameters:**\
`first`     - first name of new user\
`last`      - last name of new user\
`username`  - user's username\
`password`  - new user's password, don't worry gets hashed first thing

**Example:**\
`curl -X POST -H "Content-Type: application/json" -d '{"username":"JohnDoe", "first":"John", "last":"Doe", "password":"password"}' http://<domain>/adduser`

[source](routes/adduser.js)

## `<domain>/addfriend/:id`
### POST
Adds user as a friend to the currently logged in user, provided the friend is unique and they exist.
_Requires an access token to be used_

**Required Parameters:**\
`id`        - uid of friend to add to current user\
`token`     - in body or as query. Token issued when user logged in

**Example:**\
`curl -X POST -H "Content-Type: application/json" -d '{"token":"<token>"}' http://<domain>/addfriend/<id>`

[source](routes/addfriend.js)

## `<domain>/getuser/:id`
### GET
Retrieves a user's public information based on their uid

***Required Parameters:***\
`id`        - uid of player to fetch

***Example:***\
`curl http://<domain>/getuser/<id>`

[source](routes/getuser.js)

## `<domain>/getuser`
### GET
Retrieves all users contained in the database

***Required Parameters:***\
_None_

***Example:***\
`curl http://<domain>/getuser`

[source](routes/getuser.js)

## `<domain>/login`
### POST
Logs in a client provided they sent a correct username/password combo. Issues an access token if login is successful

***Required Parameters:***\
`username`  - Username of user to be logged in\
`password`  - Password of user to be logged in

***Example:***\
`curl -X POST -H "Content-Type: application/json" -d '{"username":"test", "password":"password"}' http://<domain>/login`

[source](routes/login.js)

## `<domain>/submitpost`
### POST
Creates a new post and stores it in the database/
_Requires token to use_

***Required Parameters:***\
`contents`  - text body of post\
`token`     - access token of currently logged in user

***Example:***\
`curl -X POST -H "Content-Type: application/json" -d '{"token":"<token>", "contents":"<post contents>"}' http://<domain>/submitpost`

[source](routes/submitpost.js)