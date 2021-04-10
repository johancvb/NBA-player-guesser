const div = document.getElementById('playerImage');
const randInt = Math.floor(Math.random() * 566);



fetch(`http://data.nba.net/data/10s/prod/v1/2020/players.json`)
    .then(response => response.json())
    .then(data => {
        const players = data.league.standard;
        const randomPlayerID = players[randInt].personId;
        const playerImg = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${randomPlayerID}.png`;
        div.src = playerImg
        console.log(div.src)
    })
