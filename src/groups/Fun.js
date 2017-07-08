const patron = require('patron.js');

class Fun extends patron.Group {
  constructor() {
    super({ name: 'fun' });
  }
}

module.exports = new Fun();