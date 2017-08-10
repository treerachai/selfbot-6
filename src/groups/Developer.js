const patron = require('patron.js');

class Developer extends patron.Group {
  constructor() {
    super({
      name: 'developer',
      description: 'These commands are mostly for the use of people with knowledge of Discord.js'  });
  }
}

module.exports = new Developer();
