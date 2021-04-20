const fetch = require('node-fetch');

async function fetchData() {

    const randInt = Math.floor(Math.random() * 566);
    const response = await fetch('http://data.nba.net/data/10s/prod/v1/2020/players.json')
    const data = await response.json()
    const player = data.league.standard[randInt];
    
    // const randomPlayerID = player.personId;

    return player
}

module.exports = fetchData;