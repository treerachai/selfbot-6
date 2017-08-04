const patron = require('patron.js');

class Statistics extends patron.Group {
  constructor() {
    super({ name: 'statistics' });
  }
}

module.exports = new Statistics();
