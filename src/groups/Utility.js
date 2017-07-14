const patron = require('patron.js');

class Utility extends patron.Group {
  constructor() {
    super({ name: 'utility' });
  }
}

module.exports = new Utility();
