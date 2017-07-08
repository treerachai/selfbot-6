const patron = require('patron');

class Utility extends patron.Group {
  constructor() {
    super({ name: 'utility' });
  }
}

module.exports = new Utility();