const patron = require('patron.js');

class ArrayLength extends patron.ArgumentPrecondition {
  constructor(min, max) {
    super();
    this.min = min;
    this.max = max;
  }

  async run(command, context, argument, value) {
    if (value.length >= this.min && value.length <= this.max) {
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, argument.name + ' must have ' + this.min + ' to ' + this.max + ' args.');
  }
}

module.exports = ArrayLength;
