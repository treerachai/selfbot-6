const patron = require('patron');

class Fun extends patron.Group {
  constructor() {
    super({ name: 'fun' });
  }
}

module.exports = new Fun();