const {secretWord} = require("../../.env")
module.exports = {
    secret: secretWord,
    jwtExpiration: 60,          // 1 minute
    jwtRefreshExpiration: 120,  // 2 minutes
}