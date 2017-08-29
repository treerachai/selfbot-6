const patron = require('patron.js');
const util = require('../../utility');

class Forward extends patron.Command {
  constructor() {
    super({
      names: ['forward'],
      groupName: 'messager',
      description: 'Sends your message to another channel',
      args: [
        new patron.Argument({
          name: 'channel',
          key: 'c',
          type: 'textchannel',
          example: 'general',
          defaultValue: patron.ArgumentDefault.Channel
        }),
        new patron.Argument({
          name: 'text',
          key: 'text',
          type: 'string',
          example: 'This was sent from another channel',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const m = await args.c.send(args.text).catch(() => null);
    if (m !== null) {
      return util.Messenger.send(msg.channel, 'Text Forwarded Successfully to: ' + args.c);
    }
    return util.Messenger.sendError(msg.channel, 'Unable to forward text to: ' + args.c);
  }
}

module.exports = new Forward();
