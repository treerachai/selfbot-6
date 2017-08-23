const patron = require('patron.js');

class ArrayEven extends patron.ArgumentPrecondition {
  constructor(isEven) {
    super();
    this.isEven = isEven;
  }

  async run(command, context, argument, value) {
    if ((value.length % 2 === 0) !== this.isEven) {
      return patron.PreconditionResult.fromError(command, argument.name + ' must have an ' + (this.isEven ? 'even' : 'odd') + ' amount of args.');
    }

    return patron.PreconditionResult.fromSuccess();
  }
}

module.exports = ArrayEven;
