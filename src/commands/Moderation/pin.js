const patron = require('patron.js');

class Pin extends patron.Command {
  constructor() {
    super({
      names: ['pin'],
      groupName: 'moderation',
      description: 'Pin a message in the current channel.',
      botPermissions: ['MANAGE_MESSAGES'],
      args: [
        new patron.Argument({
          key: 'pinmsg',
          type: 'message',
          name: 'message',
          example: 'radical',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    return args.pinmsg.pin();
  }
}

module.exports = new Pin();
