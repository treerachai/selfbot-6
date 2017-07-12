const patron = require('patron.js');
const util = require('../utility');

class Charactercount extends patron.ArgumentPrecondition {
  constructor(chars) {
    super();
    this.chars = chars;
  }

  async run(command, context, argument, value) {
    if (value.length !== this.chars) { 
      return patron.PreconditionResult.fromError(command, 'Incorrect amount of characters');
    } else {
      return patron.PreconditionResult.fromSuccess();
    }
  }
}

module.exports = Charactercount;