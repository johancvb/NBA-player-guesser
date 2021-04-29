const chatForm = document.getElementById('chat_form')
const chatMessages = document.querySelector('.chat_messages')
const roomName = document.getElementById('room_name')
const userList = document.getElementById('users')
const img = document.getElementById('playerImage')
const input = document.getElementById('guess')
const form = document.querySelector('.guessForm')

const answer_container = document.querySelector('.answers_container')

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

// API 
let currentPlayer = {};

socket.on('player', data => {

    console.log(data.player.lastName)

    outputUsers(data.score);

    currentPlayer = data.player;
    const playerImg = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${data.player.personId}.png`;
    img.src = playerImg
})

form.addEventListener('submit', checkPlayer)

function checkPlayer(e) {
    e.preventDefault()
    if (input.value.toLowerCase() === currentPlayer.lastName.toLowerCase() || input.value.toLowerCase() === currentPlayer.firstName.toLowerCase() + " " + currentPlayer.lastName.toLowerCase()) {
        input.value = '';
        input.focus();
        socket.emit('correct', { name: username })
    }
    else {
        input.value = '';
        input.focus();
    }
}
socket.emit('render')

// Join gameroom
socket.emit('joinRoom', { username, room })

// Get room and users
socket.on('roomUsers', ({ room, score }) => {
    outputRoomName(room);
    outputUsers(score);
})

// Message from server

socket.on('message', message => {
    outputMessage(message);

    // Scrol down automatically
    chatMessages.scrollTop = chatMessages.clientHeight;
})

// Message submit

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get message text
    const msg = e.target.elements.msg.value;

    // Message to server
    socket.emit('chatMessage', msg)

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
})

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div')
    div.classList.add('message')
    div.innerHTML = `
    <p class="text_meta">${message.username}  <span>${message.time}</span></p> 
    <p class="text">
    ${message.text} 
    </p>`;

    document.querySelector('.chat_messages').appendChild(div)
}

// Add roomname to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(score) { 
    const users = Object.keys(score).map(key => {
        return {
            username: key,
            score: score[key]
        }
    })

    userList.innerHTML = `
    ${users.map(user => `
    <div class="user">
        <span class="dot"></span>
        <li>${user.username} (${user.score})</li>
    </div>`).join('')}
    `;
}