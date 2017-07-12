const patron = require('patron.js');
const util = require('../utility');

class Isdiscrim extends patron.ArgumentPrecondition {
  constructor() {
    super();
  }

  async run(command, context, argument, value) {
    if (value.replace(/[^0-9]/gi, '').length !== 4 || value.length !== 4) { 
      return patron.PreconditionResult.fromError(command, 'You have provided an invalid discrim');
    } else {
      return patron.PreconditionResult.fromSuccess();
    }
  }
}

module.exports = Isdiscrim;