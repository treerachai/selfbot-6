const patron = require('patron.js');

class HappyFlip extends patron.Command {
  constructor() {
    super({
      names: ['happyflip', 'hf'],
      groupName: 'ascii',
      description: 'Adds "(╯ᐛ)╯ ︵ ┻━┻" to your message',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'text',
          type: 'string',
          example: 'Don\'t you love it when people complain about things for no reason',
          remainder: true,
          defaultValue: ''
        })
      ]
    });
  }

  async run(msg, args) {
    return msg.channel.send(args.text + ' (╯ᐛ)╯ ︵ ┻━┻');
  }
}

module.exports = new HappyFlip();
