const patron = require('patron.js');

class CharLimit extends patron.ArgumentPrecondition {
  constructor(limit) {
    super();
    this.limit = limit;
  }

  async run(command, context, argument, value) {
    if (this.limit < value.length) {
      return patron.PreconditionResult.fromError(command, argument.name + ' cannot have more than ' + this.limit + ' characters.');
    }

    return patron.PreconditionResult.fromSuccess();
  }
}

module.exports = CharLimit;
