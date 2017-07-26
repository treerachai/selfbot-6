const patron = require('patron.js');
const data = require('../../data.json');

class Emoji extends patron.Command {
  constructor() {
    super({
      name: 'emoji',
      aliases: ['emote', 'e'],
      group: 'fun',
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
    for (const index in args.text) {
      if (!args.text[index].match(/[a-z]|[0-9]/i)) {
        if (args.text[index] === ' ') {
          message += '    ';
        } else {
          message += args.text[index];
        }
      } else {
        const number = parseInt(args.text[index]);
        if (!isNaN(number)) {
          message += ':' + data.numbers[number] + ': ';
        } else {
          message += ':regional_indicator_' + args.text[index].toLowerCase() + ': ';
        }
      }
    }
    return msg.channel.send(message);
  }
}

module.exports = new Emoji();
