const patron = require('patron.js');

class Rageflip extends patron.Command {
  constructor() {
    super({
      names: ['rageflip', 'rf'],
      groupName: 'ascii',
      description: 'Adds "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻" to your message',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'text',
          type: 'string',
          example: 'I see what you did there',
          remainder: true,
          defaultValue: ''
        })
      ]
    });
  }

  async run(msg, args) {
    return msg.channel.send(args.text + ' ┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻');
  }
}

module.exports = new Rageflip();
