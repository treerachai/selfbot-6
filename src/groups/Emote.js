const patron = require('patron.js');

class Emote extends patron.Group {
  constructor() {
    super({ name: 'emote' });
  }
}

module.exports = new Emote();
