const patron = require('patron.js');
const util = require('../../utility');

class Disapprove extends patron.Command {
  constructor() {
    super({
      name: 'disapprove',
      aliases: ['da'],
      group: 'emote',
      description: 'Adds "ಠ_ಠ" to your message',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'text',
          type: 'string',
          example: 'I\'m not so sure about that',
          isRemainder: true,
          default: ''
        })
      ]
    });
  }

  async run(context, args) {
    return context.channel.send(args.text + ' ಠ_ಠ');
  }
}

module.exports = new Disapprove();
