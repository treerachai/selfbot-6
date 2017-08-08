const patron = require('patron.js');

class Happy extends patron.Command {
  constructor() {
    super({
      names: ['happy', 'h'],
      groupName: 'emote',
      description: 'Adds "ᕕ( ᐛ )ᕗ" to your message',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'text',
          type: 'string',
          example: 'I love this selfbot',
          remainder: true,
          defaultValue: ''
        })
      ]
    });
  }

  async run(msg, args) {
    return msg.channel.send(args.text + ' ᕕ( ᐛ )ᕗ');
  }
}

module.exports = new Happy();
