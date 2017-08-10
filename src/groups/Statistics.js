const patron = require('patron.js');

class Statistics extends patron.Group {
  constructor() {
    super({
      name: 'statistics',
      description: 'These commands display various statistics and information' });
  }
}

module.exports = new Statistics();
