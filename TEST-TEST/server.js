const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app)
const io = require('socket.io')(http);
const port = process.env.PORT || 9998;
const fetch = require('node-fetch');
const bodyParser = require('body-parser')

const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');
const AdminName = 'Admin';

// Set static map
app.use(express.static(path.resolve('public')))


// Run when user connects

io.on('connection', socket => {

        async function fetchData() {
            const randInt = Math.floor(Math.random() * 566);
            const response = await fetch('http://data.nba.net/data/10s/prod/v1/2020/players.json') 
            const data = await response.json()
            const players = data.league.standard;
            const randomPlayerID = players[randInt].personId;
            const playerImg = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${randomPlayerID}.png`;
            return playerImg
        }

        
        socket.on('event', data => {
            
            fetchData()
            .then(img => 
                console.log(img),
                io.emit('fetchData', img))
            
        })

    socket.on('joinRoom', ({ username, room }) => {

        // Run API
        // async function fetchData() {
        //     const randInt = Math.floor(Math.random() * 566);

        //     await fetch(`http://data.nba.net/data/10s/prod/v1/2020/players.json`)
        //         .then(response => response.json())
        //         .then(data => {
        //             const players = data.league.standard;
        //             const randomPlayerID = players[randInt].personId;
        //             const playerImg = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${randomPlayerID}.png`;
        //             return playerImg
        //         })

        // }








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
