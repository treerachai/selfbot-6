const patron = require('patron.js');
const util = require('../../utility');

class EmbedFooter extends patron.Command {
  constructor() {
    super({
      names: ['embedfooter', 'ef', 'footer'],
      groupName: 'messager',
      description: 'Sends your text in an embed footer',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'm',
          type: 'string',
          example: 'This is an embed footer',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    return util.Messenger.sendFooter(msg.channel, util.StringUtil.cleanContent(args.m));
  }
}

module.exports = new EmbedFooter();
