const patron = require('patron.js');

class Minimum extends patron.ArgumentPrecondition {
  constructor(min) {
    super();
    this.min = min;
  }

  async run(command, context, argument, value) {
    if (value < this.min) {
      return patron.PreconditionResult.fromError(command, argument.name + ' cannot be smaller than ' + this.min + '.');
    }

    return patron.PreconditionResult.fromSuccess();
  }
}

module.exports = Minimum;
