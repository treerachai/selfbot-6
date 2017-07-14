const patron = require('patron.js');

class Includes extends patron.ArgumentPrecondition {
  constructor(string) {
    super();
    this.string = string;
  }

  async run(command, context, argument, value) {
    if (value.toLowerCase().includes(this.string)) {
      return patron.PreconditionResult.fromError(command, argument.name + ' cannot contain "' + this.string + '"');
    }

    return patron.PreconditionResult.fromSuccess();
  }
}

module.exports = Includes;
