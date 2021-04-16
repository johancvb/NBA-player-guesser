const chatForm = document.getElementById('chat_form')
const chatMessages = document.querySelector('.chat_messages')
const roomName = document.getElementById('room_name')
const userList = document.getElementById('users')
const img = document.getElementById('playerImage')

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

// API 
socket.on('playerImg', (url) => {
    img.src = url
})
socket.emit('event')


// Join gameroom
socket.emit('joinRoom', { username, room })

// Get room and users
socket.on('roomUsers', ({room, users}) => {
    outputRoomName(room);
    outputUsers(users);
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
function outputUsers(users) {
    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}