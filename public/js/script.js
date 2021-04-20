const chatForm = document.getElementById('chat_form')
const chatMessages = document.querySelector('.chat_messages')
const roomName = document.getElementById('room_name')
const userList = document.getElementById('users')
const img = document.getElementById('playerImage')
const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById('btn3')
const btn4 = document.getElementById('btn4')

const answer_container = document.querySelector('.answers_container')

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

// API 
socket.on('player', player => {
    console.log(player)
    const playerImg = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${player.personId}.png`;
    img.src = playerImg
    socket.emit('correctPlayer', player)
})
socket.on('answers', (players, correctPlayer) => {
    const randInt1 = Math.floor(Math.random() * 566);
    const randInt2 = Math.floor(Math.random() * 566);
    const randInt3 = Math.floor(Math.random() * 566);
    const randInt4 = Math.floor(Math.random() * 566);


    btn1.value = `${correctPlayer.firstName + " " + correctPlayer.lastName}`    
    btn1.insertAdjacentHTML('beforeend', `
        <p>${correctPlayer.firstName + " " + correctPlayer.lastName}</p>
    `)
    btn2.value = `${players[randInt1].firstName + " " + players[randInt1].lastName}`
    btn2.insertAdjacentHTML('beforeend', `
        <p>${players[randInt1].firstName + " " + players[randInt1].lastName}</p>
    `)
    btn3.value = `${players[randInt2].firstName + " " + players[randInt2].lastName}`
    btn3.insertAdjacentHTML('beforeend', `
        <p>${players[randInt2].firstName + " " + players[randInt2].lastName}</p>
    `)
    btn4.value = `${players[randInt3].firstName + " " + players[randInt3].lastName}`
    btn4.insertAdjacentHTML('beforeend', `
        <p>${players[randInt3].firstName + " " + players[randInt3].lastName}</p>
    `)


    // btn1.value = correctPlayer.firstName + " " + correctPlayer.lastName
    // console.log(btn1.value)
    // console.log(correctPlayer.firstName + " " + correctPlayer.lastName)

    btn1.addEventListener('click', function () {

        if (btn1.value === correctPlayer.firstName + " " + correctPlayer.lastName) {
            btn1.style.backgroundColor = "#32CD32"
            socket.emit('correctAnswer', correctAnwer)
        }
        else {
            console.log("jammerrr")
        }
    })

    btn2.addEventListener('click', function () {

        if (btn2.value === correctPlayer.firstName + " " + correctPlayer.lastName) {
            btn2.style.backgroundColor = "#32CD32"
            socket.emit('correctAnswer', correctAnwer)
        }
        if (btn2.value !== correctPlayer.firstName + " " + correctPlayer.lastName) {
            btn2.style.backgroundColor = "#FF0000"
            console.log("jammerrr")
        }
    })

    btn3.addEventListener('click', function () {

        if (btn3.value === correctPlayer.firstName + " " + correctPlayer.lastName) {
            btn3.style.backgroundColor = "#32CD32"
            socket.emit('correctAnswer', correctAnwer)
        }
        if (btn3.value !== correctPlayer.firstName + " " + correctPlayer.lastName) {
            btn3.style.backgroundColor = "#FF0000"
            console.log("jammerrr")
        }
    })

    btn4.addEventListener('click', function () {

        if (btn4.value === correctPlayer.firstName + " " + correctPlayer.lastName) {
            btn4.style.backgroundColor = "#32CD32"
            socket.emit('correctAnswer', correctAnwer)
        }
        if (btn4.value !== correctPlayer.firstName + " " + correctPlayer.lastName) {
            btn4.style.backgroundColor = "#FF0000"
            console.log("jammerrr")
        }
    })

})


socket.emit('render')


// Join gameroom
socket.emit('joinRoom', { username, room })

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
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
    ${users.map(user => `
    <div class="user">
        <span class="dot"></span>
        <li>${user.username}</li>
    </div>`).join('')}
    `;
}