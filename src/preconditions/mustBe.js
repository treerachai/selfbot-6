const patron = require('patron.js');

class MustBe extends patron.ArgumentPrecondition {
  constructor(options) {
    super();
    this.options = options;
  }

  async run(command, context, argument, value) {
    let matched = false;
    let errorMessage = argument.name + ' must be one of the following: ';
      for(let index in this.options) {
        if (this.options[index] === value) {
          matched = true;
        }
        errorMessage += this.options[index];
        if (index.toString() !== (this.options.length - 1).toString()) {
          errorMessage += ', ';
        }
      }

    if (matched === false) {
      return patron.PreconditionResult.fromError(command, errorMessage);
    }

    return patron.PreconditionResult.fromSuccess();
  }
}

module.exports = MustBe;
