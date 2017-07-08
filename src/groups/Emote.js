const patron = require('patron');

class Emote extends patron.Group {
  constructor() {
    super({ name: 'emote' });
  }
}

module.exports = new Emote();