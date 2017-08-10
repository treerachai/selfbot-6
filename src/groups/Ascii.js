const patron = require('patron.js');

class Ascii extends patron.Group {
  constructor() {
    super({
      name: 'ascii',
      description: 'These commands add ascii emotes to your messages' });
  }
}

module.exports = new Ascii();
