const patron = require('patron.js');

class Emote extends patron.Group {
  constructor() {
    super({
      name: 'emote',
      description: 'These commands are related to emotes or emojis' });
  }
}

module.exports = new Emote();
