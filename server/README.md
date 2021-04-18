# TweetBook API
This is an overview of all the functionality currently implemented in the tweetbook API. Every endpoint is listed along with its function and parameters.

**Setting up**
Create new file called `config.json` in the root of the server directory. See `config.json.sample` for structure.

**Running the server**: 
- `nodemon` for autoreload on save, 
- Otherwise `node index.js`
_Uses port 3000 by default_

## `<domain>/addfriend/:id`
### `POST`
Adds user as a friend to the currently logged in user, provided the friend is unique and they exist.\
_Requires an access token to be used_

**Required Parameters:**\
`id`        - uid of friend to add to current user\
`token`     - in body or as query. Token issued when user logged in

**Example:**\
`curl -X POST -H "Content-Type: application/json" -d '{"token":"<token>"}' http://<domain>/addfriend/<id>`

[source](routes/addfriend.js)

## `<domain>/adduser`
### `POST`
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

## `<domain>/getpost`
### `GET`
Gets all the posts stored in the database

**Required Parameters:**\
_None_

**Example:**\
`curl http://<domain>/getpost`

[source](routes/getpost.js)

## `<domain>/getpost/:id`
### `GET`
Gets a unique post by id

**Required Parameters:**\
`id`        - id of the post

**Example:**\
`curl http://<domain>/getpost/<id>`

[source](routes/getpost.js)

## `<domain>/getpost/user/:id`
### `GET`
Gets all posts from a specific user

**Required Parameters:**\
`id`        - id of the user

**Example:**\
 `curl http://<domain>/getpost/user/<id>`

[source](routes/getpost.js)

## `<domain>/getuser/:id`
### `GET`
Retrieves a user's public information based on their uid

**Required Parameters:**\
`id`        - uid of player to fetch

**Example:**\
`curl http://<domain>/getuser/<id>`

[source](routes/getuser.js)

## `<domain>/getuser`
### `GET`
Retrieves all users contained in the database

**Required Parameters:**\
_None_

**Example:**\
`curl http://<domain>/getuser`

[source](routes/getuser.js)

## `<domain>/login`
### `POST`
Logs in a client provided they sent a correct username/password combo. Issues an access token if login is successful

**Required Parameters:**\
`username`  - Username of user to be logged in\
`password`  - Password of user to be logged in

**Example:**\
`curl -X POST -H "Content-Type: application/json" -d '{"username":"test", "password":"password"}' http://<domain>/login`

[source](routes/login.js)

## `<domain>/submitcomment/:id`
### `POST`
Creates new comment on parent post with id\
_Requires token to use_

**Required Parameters:**\
`id`        - identifier of original post\
`contents`  - text body of comment\
`token`     - access token of currently logged in user

**Example:**\
 `curl -X POST -H "Content-Type: application/json" -d '{"token":<token>, "contents":<contents>}' http://<domain>/submitcomment/<id>`

 [source](routes/submitcomment.js);

## `<domain>/submitpost`
### `POST`
Creates a new post and stores it in the database\
_Requires token to use_

**Required Parameters:**\
`contents`  - text body of post\
`token`     - access token of currently logged in user

**Example:**\
`curl -X POST -H "Content-Type: application/json" -d '{"token":"<token>", "contents":"<post contents>"}' http://<domain>/submitpost`

[source](routes/submitpost.js)