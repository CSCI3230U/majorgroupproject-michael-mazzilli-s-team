const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "OPTION"]
  }
});

var lobbyList = {}
var lobby = []

var users = {}
var sockets = {}

io.on("connection", socket => {
  // either with send()
  socket.send("connection established!");

  // When a message is sent, we want it to go to the lobby the user is registered to,
  // and the team that the user is intending to send the message to
  socket.on("sendMessage", function (username, team, message)  {
    user = users[username]
    console.log(`'${user.nickname}'->[${user.lobby.name + team}]: ${message}`)
    user.socket.in(user.lobby.name + team).emit("lobby", username, team, message)
  });

  // Register a socket:username
  socket.on("register", function (username, nickname) {
    addUser(socket, username, nickname)
  })

  // Request to join the lobby, if it's available
  socket.on("joinLobbyRequest", function(username, lobbyName) {
    user = users[username]

    console.log(`'${user.username}' is attempting to join the lobby.`)
    if (lobbyList.hasOwnProperty(lobbyName)) {
      addUserToLobby(user, lobbyName)
    } else {
      console.log(`[${lobbyName}] NOT FOUND: Creating lobby`)
      lobbyList[lobbyName] = {name : lobbyName, host : username, users : [user] }
      addUserToLobby(user, lobbyName)
    }
  })
});

// Add a user to a lobby
function addUserToLobby(user, lobbyName) {
  lobbyList[lobbyName].users.push({user})
  console.log(`[${lobbyName}] => '${user.username}' added to lobby list`)
  registerChat(user, lobbyName + "lobby")
  user.lobby = lobbyList[lobbyName]

  // tell everyone in the lobby we've arrived!
  user.socket.to(lobbyName + "lobby").emit("appendMessage", `'${user.username}' has joined the lobby!`);
}

// Add a reference from a user to a socket, and a socket to a username
function addUser(socket, username, nickname) {
  if (users.hasOwnProperty(username)) { 
    console.log('name taken!')
    users[username] = {socket : socket, username : username, nickname : nickname, lobby : null}
    console.log('using it anyway!')
  } else {
    users[username] = {socket : socket, username : username, nickname : nickname, lobby : null}
  }
  
  sockets[socket] = users[username]
  console.log('[' + username + '] REGISTERED')
}

// Register to a chat channel for broadcasting
function registerChat(user, roomName) {
  console.log(`'${user.username}' registered to room '${roomName}'`)
  user.socket.emit('registerChat', roomName)
  user.socket.join(roomName)
}

