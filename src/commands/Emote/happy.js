const patron = require('patron.js');
const util = require('../../utility');

class Happy extends patron.Command {
  constructor() {
    super({
      name: 'happy',
      aliases: ['h'],
      group: 'emote',
      description: 'Adds "ᕕ( ᐛ )ᕗ" to your message',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'text',
          type: 'string',
          example: 'I love this selfbot',
          isRemainder: true
        })
      ]
    });
  }

  async run(context, args) {
    return context.channel.send(args.text + ' ᕕ( ᐛ )ᕗ');
  }
}

module.exports = new Happy();
