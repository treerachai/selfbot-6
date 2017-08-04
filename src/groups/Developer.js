const patron = require('patron.js');

class Developer extends patron.Group {
  constructor() {
    super({ name: 'developer' });
  }
}

module.exports = new Developer();
