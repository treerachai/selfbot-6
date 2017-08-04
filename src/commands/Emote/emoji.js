const patron = require('patron.js');
const data = require('../../data.json');
const util = require('../../utility');

class Emoji extends patron.Command {
  constructor() {
    super({
      name: 'emoji',
      aliases: ['e'],
      group: 'emote',
      description: 'Turns your message into emojis',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'text',
          type: 'string',
          example: 'What do you mean',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    let message = '';
    for (let i = 0; i < args.text.length; i++) {
      if (!args.text.charAt(i).match(/[a-z]|[0-9]/i)) {
        if (args.text.charAt(i) === ' ') {
          message += '    ';
        } else {
          message += args.text.charAt(i);
        }
      } else {
        const number = parseInt(args.text.charAt(i));
        if (!isNaN(number)) {
          message += ':' + data.numbers[number] + ': ';
        } else {
          message += ':regional_indicator_' + args.text.charAt(i).toLowerCase() + ': ';
        }
      }
    }
    if (message.length < 2000) {
      return msg.channel.send(message);
    }
    return util.Messenger.sendError(msg.channel, 'Message too long');
  }
}

module.exports = new Emoji();
