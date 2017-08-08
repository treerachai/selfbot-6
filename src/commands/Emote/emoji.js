const patron = require('patron.js');
const data = require('../../data.json');
const util = require('../../utility');

class Emoji extends patron.Command {
  constructor() {
    super({
      names: ['emoji', 'e'],
      groupName: 'emote',
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
    const text = util.StringUtil.cleanContent(msg, args.text);
    let message = '';
    for (let i = 0; i < text.length; i++) {
      if (!text.charAt(i).match(/[a-z]|[0-9]/i)) {
        if (text.charAt(i) === ' ') {
          message += '    ';
        } else {
          message += text.charAt(i);
        }
      } else {
        const number = parseInt(text.charAt(i));
        if (!isNaN(number)) {
          message += ':' + data.numbers[number] + ': ';
        } else {
          message += ':regional_indicator_' + text.charAt(i).toLowerCase() + ': ';
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
