const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app)
const io = require('socket.io')(http);
const port = process.env.PORT || 9999;

const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');
const fetchData = require('./utils/apiHandler')
const AdminName = 'Chat Bot';
let currentPlayer;
let score = {};

// Set static map
app.use(express.static(path.resolve('public')))


// Run when user connects

io.on('connection', socket => {

    socket.on('render', data => {
        if (currentPlayer) {
            io.emit('player', {player: currentPlayer, score})
        }
        else {
            fetchData()
                .then(player => {
                    io.emit('player', {player, score})
                    currentPlayer = player
                })
        }
    })

    socket.on('correct', data => {
        if (score[data.name]){
            score[data.name] += 1
        }
        else {
            score[data.name] = 1
        }
        // console.log(score)

        fetchData()
        .then(player => {
            io.emit('player', {player, score})
            currentPlayer = player
        })
    })

    socket.on('joinRoom', ({ username, room }) => {

        score[username] = 0
        const user = userJoin(socket.id, username, room);

        socket.join(user.room)

        // Welcome current user
        socket.emit('message', formatMessage(AdminName, 'Welcome to the NBA Player Guesser chat!'));

        // Broadcast when user connects
        socket.broadcast
            .to(user.room)
            .emit('message',
                formatMessage(AdminName, `${user.username} has joined the chat.`));

        // Send users and room info
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            score
        })
    });

    // Listen for chatMessage
    socket.on('chatMessage', msg => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg));
    })

    // When client disconnects
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit('message', formatMessage(AdminName, `${user.username} has left the chat.`));

            // Send users and room info
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        }
    })
})

http.listen(port, () => console.log(`Server is running on port: ${port}, http://localhost:${port}`));
