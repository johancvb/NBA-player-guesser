const fetch = require('node-fetch');

async function fetchData() {

    // let playerArr = [];

    // for(let i = 0; i < 16; i++){
        // const randInt = Math.floor(Math.random() * 566);
        const response = await fetch('http://data.nba.net/data/10s/prod/v1/2020/players.json')
        const data = await response.json()
        const players = data.league.standard;
        // const randomPlayerID = player.personId;
        // playerArr.push(player)
        
    // }
    // console.log(players)
    return players
}

module.exports = fetchData;