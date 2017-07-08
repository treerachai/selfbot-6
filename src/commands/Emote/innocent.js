const patron = require('patron.js');
const util = require('../../utility');

class Innocent extends patron.Command {
  constructor() {
    super({
      name: 'innocent',
      aliases: ['in'],
      group: 'emote',
      description: 'Adds "ʘ‿ʘ" to your message',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'text',
          type: 'string',
          example: 'Somehow the money just disappeared',
          isRemainder: true,
          default: ''
        })
      ]
    });
  }

  async run(context, args) {
    return context.channel.send(args.text + ' ʘ‿ʘ');
  }
}

module.exports = new Innocent();
