const patron = require('patron.js');

class Fliptable extends patron.Command {
  constructor() {
    super({
      names: ['fliptable', 'ft'],
      groupName: 'emote',
      description: 'Adds "ノ┬─┬ノ ︵ ( \\o°o)\\" to your message',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'text',
          type: 'string',
          example: 'The tables have had enough',
          remainder: true,
          defaultValue: ''
        })
      ]
    });
  }

  async run(msg, args) {
    return msg.channel.send(args.text + ' ノ┬─┬ノ ︵ ( \\o°o)\\');
  }
}

module.exports = new Fliptable();
