const patron = require('patron.js');
const util = require('../../utility');

class Embed extends patron.Command {
  constructor() {
    super({
      names: ['embed', 'e', 'description'],
      groupName: 'messager',
      description: 'Sends your text in an embed',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'm',
          type: 'string',
          example: 'This is an embed',
          remainder: true,
          defaultValue: ' '
        })
      ]
    });
  }

  async run(msg, args) {
    return util.Messenger.send(msg.channel, args.m);
  }
}

module.exports = new Embed();
