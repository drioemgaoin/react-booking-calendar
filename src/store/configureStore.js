if (process.env.NODE_ENV === 'production' || (location && location.hostname !== 'localhost')) {
} else {
  module.exports = require('./configureStore.dev');
}
