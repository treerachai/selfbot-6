const patron = require('patron.js');
const util = require('../../utility');
const CharLimit = require('../../preconditions/charLimit.js');

class EmbedTitle extends patron.Command {
  constructor() {
    super({
      names: ['embedtitle', 'et', 'title'],
      groupName: 'messager',
      description: 'Sends your text in an embed title',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'm',
          type: 'string',
          example: 'This is an embed title',
          remainder: true,
          preconditions: [new CharLimit(256)]
        })
      ]
    });
  }

  async run(msg, args) {
    return util.Messenger.sendTitle(msg.channel, util.StringUtil.cleanContent(msg, args.m));
  }
}

module.exports = new EmbedTitle();
