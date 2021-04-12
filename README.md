# 🏀NBA Player Guesser
Ben je een fan van basketbal, en dan vooral van de NBA?! Dan is de NBA Player Guesser een leuk spel voor jou!
<br><br>
Raad van verschillende NBA spelers de naam, en krijg punten.
Speel tegen andere spelers, en wie het snelst de NBA spelers raadt, wint!

## 📝Concept
Deze app is een spel waarbij verschillende gebruikers tegen elkaar moeten spelen. Het doel is om zo veel mogelijk NBA spelers te raden, en hier punten mee te verdienen. Hoe sneller je de naam van een speler raadt, hoe meer punten je krijgt.
<br><br>
De app maakt gebruik van websocket, waardoor er meerdere clients een connectie kunnen maken met een server, en zo dus tegen elkaar kunnen spelen.
<br><br>
Hieronder ziet u een paar schetsen van mogelijke User Interfaces:

- De begin pagina, deze blijft hetzelfde:
<br>
<img src="https://imgur.com/7Dczp4p.png" width="300" height="300">

- De eerste game pagina schets:
<br>
<img src="https://imgur.com/LomFwNd.png" width="300" height="300">

- De tweede game pagina schets:
<br>
<img src="https://imgur.com/K6T8aXm.png" width="300" height="300">

- De derde game pagina schets:
<br>
<img src="https://imgur.com/ho48EH7.png" width="300" height="300">

Ik denk dat de eerste schets het meest overzichtelijk, clean, en makkelijkst te gebruiken is voor de gebruiker.

<br><br>
## 📲API
Deze app maakt gebruik van een API, te vinden op: https://github.com/kashav/nba.js/blob/master/docs/api/DATA.md
<br><br>
De API heeft veel verschillende endpoints, maar ik maak alleen gebruik van de endpoint: 
- "players" === ( http://data.nba.net/data/10s/prod/v1/{year}/players.json ) 
<br><br>
De parameter {year} is het seizoen van de NBA waar je de speler uit wilt halen. Ik gebruik alleen de recentste spelers, namelijk uit het seizoen van 2020, maar eventueel kan ik later als toevoeging verschillende seizoenen als optie meegeven voor de gebruikers.
<br><br>
Uit deze API haal ik de ID van de spelers, waarmee ik met een andere link de bijbehorende foto van de desbetreffende speler kan opvragen.
<br><br> 
Eventueel kan ik later ook als toevoeging een optie realiseren waardoor het voor de gebruiker mogelijk is om een speler te raden aan de hand van een combinatie van een Team + Rugnummer. Dit zijn toevoegingen die ik later, als de basis van de app er is, misschien kan toevoegen.
<br><br>

Om de bijbehorende foto van een speler op te kunnen vragen, heb ik de (eerder uitgelegde) player_id nodig. Deze player_id haal ik uit de API, en voeg ik vervolgens toe aan de volgende link:

- https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${randomPlayerID}.png

Hierbij is {randomPlayerID} de player_id van de desbetreffende NBA speler.
<br><br>

## 📊DataFlow
Om de werking tussen de clients en de server te verduidelijken, én om de connecties tussen de verschillende compontenten in deze app te weergeven, heb ik een DataFlow gemaakt. Zie hieronder een foto van de DataFlow:

![](https://imgur.com/jiw7ksh.png)

In de bovenstaande DataFlow is "x" een request die de client doet naar de server. Deze request kan een speler-gok zijn, maar ook als de gebruiker connectie maakt met een room, of een berichtje stuurt in de chat. 
<br><br>

## 🔜Toekomstige plannen
Hieronder heb ik een lijstje gemaakt met toepassingen die ik eventueel later in de toekomst wil toepassen op mijn app:

* [ ] Meerdere rooms maken.
* [ ] Opties om spelers te raden aan de hand van rugnummers, teams etc.
* [ ] Een gebruiker kan zich registeren, om zijn voortgang bij te houden.
* [ ] Verschillende "parameters" kunnen veranderen, dus bijvoorbeeld spelers raden uit een ander seizoen.
<br><br>

