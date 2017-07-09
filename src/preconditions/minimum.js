const patron = require('patron.js');
const util = require('../utility');

class Minimum extends patron.ArgumentPrecondition {
  constructor(min) {
    super();
    this.min = min;
  }

  async run(command, context, argument, value) {
    if (value < this.min) { 
      return patron.PreconditionResult.fromError(command, 'Value too small');
    } else {
      return patron.PreconditionResult.fromSuccess();
    }
  }
}

module.exports = Minimum;