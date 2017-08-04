const patron = require('patron.js');

class Stats extends patron.Group {
  constructor() {
    super({ name: 'stats' });
  }
}

module.exports = new Stats();
