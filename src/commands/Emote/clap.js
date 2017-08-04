const patron = require('patron.js');

class Clap extends patron.Command {
  constructor() {
    super({
      name: 'clap',
      aliases: ['clapping', ':clap:'],
      group: 'emote',
      description: '👏 Emphasize 👏 your 👏 text 👏',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'text',
          type: 'string',
          example: 'PapaJohn\'s Selfbot is the best',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    let m = ':clap: ';
    for (let i = 0; i < args.text.length; i++) {
      if (args.text.charAt(i) !== ' ') {
        m += args.text.charAt(i);
      } else {
        m += ' :clap: ';
      }
    }
    m += ' :clap:';

    return msg.channel.send(m);
  }
}

module.exports = new Clap();
