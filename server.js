const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app)
const io = require('socket.io')(http);
const port = process.env.PORT || 9999;

const bodyParser = require('body-parser')

const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');
const fetchData = require('./utils/apiHandler')
const AdminName = 'Chat Bot';
let currentPlayerImg;

// Set static map
app.use(express.static(path.resolve('public')))


// Run when user connects

io.on('connection', socket => {

    // fetchData()

    // socket.on('event', data => {
    //     if (currentPlayerImg) {
    //         io.emit('playerImg', currentPlayerImg)
    //     }
    //     else {
    //         fetchData()
    //             .then(img => {
    //                 io.emit('playerImg', img)
    //                 currentPlayerImg = img
    //             })
                    
    //     }

    // })

    socket.on('render', data => {
        fetchData()
        .then(player => {
            io.emit('player', player)
            
            
        })
    })

    socket.on('joinRoom', ({ username, room }) => {

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
            users: getRoomUsers(user.room)
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
