const patron = require('patron.js');
const util = require('../../utility');

class Rageflip extends patron.Command {
  constructor() {
    super({
      name: 'rageflip',
      aliases: ['rf'],
      group: 'emote',
      description: 'Adds "┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻" to your message',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'text',
          type: 'string',
          example: 'I see what you did there',
          isRemainder: true,
          default: ''
        })
      ]
    });
  }

  async run(msg, args) {
    return msg.channel.send(args.text + ' ┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻');
  }
}

module.exports = new Rageflip();
