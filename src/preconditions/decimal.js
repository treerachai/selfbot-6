const patron = require('patron.js');

class Decimal extends patron.ArgumentPrecondition {
  constructor(maxPlaces) {
    super();
    this.maxPlaces = maxPlaces;
  }

  async run(command, context, argument, value) {
    const places = value % 1?value.toString().split(".")[1].length:0;
    if (places > this.maxPlaces) {
      return patron.PreconditionResult.fromError(command, argument.name + ' cannot have more than ' + this.maxPlaces + ' decimal places.');
    }

    return patron.PreconditionResult.fromSuccess();
  }
}

module.exports = Decimal;
