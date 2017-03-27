module.exports = (app, playerService) => {
  app.get('/', (request, response) => {
    response.send('Sick bruh')
  })

  app.get('/players', (request, response) => {
    const players = request.query.players.split(',')

    console.log(`\n\n-----Recieved request for players: ${players.join(', ')}-----`)

    Promise.all(players.map(playerService.getUserInfo))
      .then(playerStats => {
        response.send(playerStats)
      })
      .catch(error => {
        response.status(500).send(error)
      })
  })
}
