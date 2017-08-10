const patron = require('patron.js');

class Innocent extends patron.Command {
  constructor() {
    super({
      names: ['innocent', 'in'],
      groupName: 'ascii',
      description: 'Adds "ʘ‿ʘ" to your message',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'text',
          type: 'string',
          example: 'Somehow the money just disappeared',
          remainder: true,
          defaultValue: ''
        })
      ]
    });
  }

  async run(msg, args) {
    return msg.channel.send(args.text + ' ʘ‿ʘ');
  }
}

module.exports = new Innocent();
