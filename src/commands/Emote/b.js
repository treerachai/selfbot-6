const patron = require('patron.js');

class B extends patron.Command {
  constructor() {
    super({
      name: 'b',
      aliases: [':b:'],
      group: 'emote',
      description: '🅱',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'text',
          type: 'string',
          example: 'You\'d better believe it\'s butter',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    let message = '';
    for (let i = 0; i < args.text.length; i++) {
      if (!args.text.charAt(i).toLowerCase().match('b')) {
        message += args.text.charAt(i);
      } else {
        message += ':b:';
      }
    }
    return msg.channel.send(message);
  }
}

module.exports = new B();
