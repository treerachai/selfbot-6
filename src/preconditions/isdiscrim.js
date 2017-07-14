const patron = require('patron.js');

class IsDiscrim extends patron.ArgumentPrecondition {
  async run(command, context, argument, value) {
    if (value.replace(/[^0-9]/gi, '').length !== 4 || value.length !== 4) {
      return patron.PreconditionResult.fromError(command, 'You have provided an invalid discrim');
    }

    return patron.PreconditionResult.fromSuccess();
  }
}

module.exports = IsDiscrim;
