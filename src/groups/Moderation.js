const patron = require('patron.js');

class Moderation extends patron.Group {
  constructor() {
    super({ name: 'moderation' });
  }
}

module.exports = new Moderation();
