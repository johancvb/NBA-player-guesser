const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app)
const io = require('socket.io')(http);
const port = process.env.PORT || 9999;

// Set static map
app.use(express.static(path.resolve('public')))

// Run when user connects

io.on('connection', socket => {
    console.log('New connection...')

    socket.emit('message', 'Welcome to Chat App!')
});


http.listen(port, () => console.log(`Server is running on port: ${port}`));
