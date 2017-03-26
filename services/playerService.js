const request = require('request')

module.exports = class PlayerService {
  constructor (cachingService) {
    this._cachingService = cachingService // Underscore means private

    this.getUserInfo = this.getUserInfo.bind(this)
  }

  /**
   * Makes an API request to get the info for the provided player.
   * @param {string} userId The user's ID.
   * @returns {Promise} Resolves to the user's info.
   */
  getUserInfo (userId) {
    return this._getUserInfoFromCache(userId)
      .then(userInfo => {
        if (userInfo != null) {
          console.log(`Returning request for ${userId} from cache.`)
          return userInfo
        }

        return this._getUserInfoFromService(userId)
      })
  }

  _getUserInfoFromCache (userId) {
    return this._cachingService.getUserInfo(userId)
  }

  _getUserInfoFromService (userId) {
    return new Promise((resolve, reject) => {
      const headers = {
        'User-Agent': (Math.random() * (10000 - 0) + 0).toString() + 'Sorry bruh'
      }
      const url =  `http://owapi.net/api/v3/u/${userId}/blob`

      request({ headers, url }, (error, response, body) => {
        if (error != null) {
          reject(error)
          return
        }

        let userInfo = JSON.parse(body)
        userInfo.username = userId

        if (response.statusCode === 200) {
          this._cachingService.setUserInfo(userId, userInfo)
        }

        console.log(`Returning request for ${userId} from web service.`)
        resolve(userInfo)
      })
    })
  }
}
