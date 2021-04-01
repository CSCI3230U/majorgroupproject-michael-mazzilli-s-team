// Socket connection to the server
const socket = io("ws://localhost:3000");
var username = "Connor"
var team = "all"
var lobby = "testLobby"

$(document).ready(function() {

    console.log("client loaded")

    // Click listener for sending a message
    document.getElementById('send-message').addEventListener("click", function() {
        msg = document.getElementById('message').value
        socket.emit("sendMessage", username, "lobby", msg)
        document.getElementById('message').value = ''
    })
    
    // Click listener for joining a lobby
    document.getElementById('joinLobbyButton').addEventListener("click", function() {
        var lname = document.getElementById('lobbyName').value
        var uname = document.getElementById('username').value

        socket.emit("joinLobbyRequest", uname, lname)
    })

    // Click listener for registering an account
    document.getElementById('registerButton').addEventListener("click", function() {
        username = document.getElementById('username').value
        nickname = document.getElementById('nickname').value
        lobbyName = document.getElementById('lobbyName').value

        socket.emit("register", username, nickname)
    })

    // Called when we connect to the server
    socket.on("connect", () => {
    });
      
    // Called to append a message to our message log
    socket.on("appendMessage", function (message) {
            appendMessage(message)
        }
    );

    // Join chat rooms that are dynamically created for your team/lobby
    socket.on('registerChat', function(roomName) {
        console.log("registering to room:", roomName)
        socket.on(roomName), function(username, team, message) {
            appendMessage("<b>" + username + "</b>: " + message)
        }
    })    
    
    socket.on("lobby"), function(username, message) {
        console.log("message",message)
        appendMessage("<b>" + username + "</b>: " + message)
    }

    function sendMessage(team, message) {
        socket.emit("sendMessage", username, "lobby", message)
    }
});



function appendMessage(message) {
    document.getElementById('chat-messages').innerHTML += message + "<br>"
}

