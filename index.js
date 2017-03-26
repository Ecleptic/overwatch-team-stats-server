const express = require('express')
const redis = require('redis')

const controller = require('./controller')
const CachingService = require('./services/cachingService')
const PlayerService = require('./services/playerService')

const app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const redisClient = redis.createClient('//localhost:6379')

const cachingService = new CachingService(redisClient)
const playerService = new PlayerService(cachingService)

controller(app, playerService)

app.listen(8080, () => {
  console.log('💩')
})
