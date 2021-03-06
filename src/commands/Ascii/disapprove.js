const patron = require('patron.js');

class Disapprove extends patron.Command {
  constructor() {
    super({
      names: ['disapprove', 'da'],
      groupName: 'ascii',
      description: 'Adds "ಠ_ಠ" to your message',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'text',
          type: 'string',
          example: 'I\'m not so sure about that',
          remainder: true,
          defaultValue: ''
        })
      ]
    });
  }

  async run(msg, args) {
    return msg.channel.send(args.text + ' ಠ_ಠ');
  }
}

module.exports = new Disapprove();
