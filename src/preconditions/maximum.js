const patron = require('patron.js');
const util = require('../utility');

class Maximum extends patron.ArgumentPrecondition {
  constructor(max) {
    super();
    this.max = max;
  }

  async run(command, context, argument, value) {
    if (value > this.max) { 
      return patron.PreconditionResult.fromError(command, 'Value too large');
    } else {
      return patron.PreconditionResult.fromSuccess();
    }
  }
}

module.exports = Maximum;