const patron = require('patron.js');

class Fun extends patron.Group {
  constructor() {
    super({
      name: 'fun',
      description: 'These commands were made with fun and entertainment in mind' });
  }
}

module.exports = new Fun();
