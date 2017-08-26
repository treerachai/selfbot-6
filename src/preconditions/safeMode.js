const patron = require('patron.js');
const credentials = require('../credentials.json');

class SafeMode extends patron.Precondition {
  async run(command, msg) {
    if (credentials.safeMode !== true) {
      return patron.PreconditionResult.fromSuccess();
    }

    return patron.PreconditionResult.fromError(command, 'This command cannot be executed while the selfbot is in Safe Mode.');
  }
}

module.exports = new SafeMode();
