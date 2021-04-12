const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app)
const io = require('socket.io')(http);
const port = process.env.PORT || 9999;
const fetch = require('node-fetch');
const bodyParser = require('body-parser')
const randInt = Math.floor(Math.random() * 566);

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({
    extended: true
}));


// Set static map
app.use(express.static(path.resolve('public')))


// Run when user connects

app.get('/', function (req, res) {
    res.redirect('/home');
});

app.get('/home', function (req, res) {
    io.on('connection', socket => {
        console.log('New connection...')

        socket.emit('message', 'Welcome to Chat App!')
        console.log()

    });
    res.render('home');

});

app.post('/game', function (req, res) {

    console.log(randInt)

    fetch(`http://data.nba.net/data/10s/prod/v1/2020/players.json`)
        .then(response => response.json())
        .then(data => {
            const players = data.league.standard;
            const randomPlayerID = players[randInt].personId;
            const playerImg = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${randomPlayerID}.png`;

            res.render('game', {
                playerImg: playerImg
            });
        })

    io.on('connection', socket => {
        console.log('New connection...')

        socket.emit('message', 'Welcome to Chat App!')



    });
})




http.listen(port, () => console.log(`Server is running on port: ${port}, http://localhost:${port}`));
