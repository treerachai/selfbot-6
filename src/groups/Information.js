const patron = require('patron.js');

class Information extends patron.Group {
  constructor() {
    super({
      name: 'information',
      description: 'These commands provide you with various bits of information' });
  }
}

module.exports = new Information();
