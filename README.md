# tambola
1. Must have Mongo DB and Node js installed on your computer
2. To start the application do:
- npm install
- node app
3. Server runs on port 3000. Therefore the base url is http://localhost:3000
4. API reference:
- /api/game/create -> game_id
- /api/game/{game_id}/ticket/{user_name}/generate -> ticket_id
- /api/game/ticket/{ticket_id} -> gives an html as a response
- /api/game/{game_id}/number/random -> pick random number for game without duplicates
- /api/game/{game_id}/numbers -> returns all numbers picked for this game until now
- /api/game/{game_id}/stats -> stats of the game {numbers drawn/no of tickets/no of users}
5. All responses are being sent in json

