const patron = require('patron.js');

class Emoji extends patron.Group {
  constructor() {
    super({
      name: 'emoji',
      description: 'These commands are related to emojis or emotes' });
  }
}

module.exports = new Emoji();
