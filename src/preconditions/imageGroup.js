const patron = require('patron.js');

class ImageGroup extends patron.Precondition {
  async run(command, msg) {
    if (msg.member === null) {
      return patron.PreconditionResult.fromSuccess();
    }
    if (msg.member.hasPermission('ATTACH_FILES')) {
      return patron.PreconditionResult.fromSuccess();
    }
    return patron.PreconditionResult.fromError(command, 'You do not have permission to send images here.');
  }
}

module.exports = new ImageGroup();
