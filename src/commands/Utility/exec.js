const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');
const Exclude = require('../../preconditions/exclude.js');

class Exec extends patron.Command {
  constructor() {
    super({
      name: 'exec',
      aliases: ['execute'],
      group: 'utility',
      description: 'Execute JavaScript code',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'code',
          key: 'code',
          type: 'string',
          example: 'msg.channel.send(\'This selfbot is good\');',
          remainder: true,
          preconditions: [new Exclude('client')]
        })
      ]
    });
  }

  async run(msg, args) {
    try {
      eval(args.code);
    } catch (err) {
      return util.Messenger.sendError(msg.channel, '```js\n' + err + '```');
    }
  }
}

module.exports = new Exec();
