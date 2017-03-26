const express = require('express')
const redis = require('redis')

const config = require('./config')
const controller = require('./controller')
const CachingService = require('./services/cachingService')
const PlayerService = require('./services/playerService')

const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const redisClient = redis.createClient(config.redisUrl)

const cachingService = new CachingService(redisClient)
const playerService = new PlayerService(cachingService)

controller(app, playerService)

app.listen(config.port, () => {
  console.log('App listening.')
})
