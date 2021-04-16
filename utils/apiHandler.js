const fetch = require('node-fetch');

async function fetchData() {

    const randInt = Math.floor(Math.random() * 566);
    const response = await fetch('http://data.nba.net/data/10s/prod/v1/2020/players.json')
    const data = await response.json()
    const players = data.league.standard;
    const randomPlayerID = players[randInt].personId;
    const playerImg = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${randomPlayerID}.png`;







    return playerImg
}

module.exports = fetchData;