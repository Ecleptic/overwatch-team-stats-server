module.exports = class CachingService {
  constructor (redisClient) {
    this._cacheTtlSeconds = 1800 // 30 minutes
    this._redisClient = redisClient
  }

  /**
   * Retrieves a user from cache.
   * @param {string} userId The user's ID.
   * @returns {Promise} Resolves to the user's info, or null if not cached.
   */
  getUserInfo (userId) {
    return new Promise((resolve, reject) => {
      this._redisClient.get(userId, (error, userInfoString) => {
        if (error != null) {
          reject(error)
          return
        }

        resolve(JSON.parse(userInfoString))
      })
    })
  }

  /**
   * Caches a user's info.
   * @param {sring}  userId   The user's ID.
   * @param {Object} userInfo The user's info.
   */
  setUserInfo (userId, userInfo) {
    this._redisClient.set(userId, JSON.stringify(userInfo), 'EX', this._cacheTtlSeconds)
  }
}
