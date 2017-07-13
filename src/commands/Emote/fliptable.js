const patron = require('patron.js');

class Fliptable extends patron.Command {
  constructor() {
    super({
      name: 'fliptable',
      aliases: ['ft'],
      group: 'emote',
      description: 'Adds "ノ┬─┬ノ ︵ ( \\o°o)\\" to your message',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'text',
          type: 'string',
          example: 'The tables have had enough',
          remainder: true,
          default: ''
        })
      ]
    });
  }

  async run(msg, args) {
    return msg.channel.send(args.text + ' ノ┬─┬ノ ︵ ( \\o°o)\\');
  }
}

module.exports = new Fliptable();
