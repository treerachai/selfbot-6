const patron = require('patron.js');

class Utility extends patron.Group {
  constructor() {
    super({
      name: 'utility',
      description: 'These commands provide various utilities and services' });
  }
}

module.exports = new Utility();
