require('dotenv')

module.exports = {
  overwatchApiBaseUrl: process.env.OWAPI_BASE_URL || 'http://owapi.net/api/v3/u',
  port: process.env.PORT || 8080,
  redisUrl: process.env.REDIS_URL || '//localhost:6379',
  userAgent: process.env.USER_AGENT || (Math.random() * (10000 - 0) + 0).toString()
}
