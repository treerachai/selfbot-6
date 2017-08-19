const patron = require('patron.js');
const util = require('../../utility');

class Lmgtfy extends patron.Command {
  constructor() {
    super({
      names: ['lmgtfy', 'letmegooglethatforyou', 'google'],
      groupName: 'information',
      description: 'Help someone learn how to google their question',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'search',
          key: 'text',
          type: 'string',
          example: 'How do I order pizza',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const text = util.StringUtil.cleanContent(msg, args.text).replace(/[^0-9a-z ]/gi, '');
    if (text.length === 0) {
      return util.Messenger.sendError(msg.channel, 'Search must be alphanumeric');
    }
    let message = 'http://lmgtfy.com/?q=';
    for (let i = 0; i < text.length; i++) {
      if (text.charAt(i) === ' ') {
        message += '+';
      }else{
        message += text.charAt(i); 
      }
    }

    return msg.channel.send(message);
  }
}

module.exports = new Lmgtfy();
