if (process.env.NODE_ENV === `productuin`) {
  module.exports = require(`./prod`)
} else {
  module.exports = require(`./dev`)
}
