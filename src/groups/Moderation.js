const patron = require('patron.js');

class Moderation extends patron.Group {
  constructor() {
    super({
      name: 'moderation',
      description: 'These commands aid in the moderation and management of servers' });
  }
}

module.exports = new Moderation();
