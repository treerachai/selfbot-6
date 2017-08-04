const patron = require('patron.js');
const util = require('../../utility');

class Ban extends patron.Command {
  constructor() {
    super({
      name: 'ban',
      group: 'utility',
      description: 'Ban any user.',
      botPermissions: ['BAN_MEMBERS'],
      args: [
        new patron.Argument({
          key: 'user',
          type: 'user',
          name: 'user',
          example: '"PeePee Juanathog#7643"'
        }),
        new patron.Argument({
          key: 'reason',
          type: 'string',
          name: 'reason',
          example: 'Raiding the server',
          defaultValue: 'Banned via PapaJohn#7777\'s Selfbot',
          remainder: true
        })        
      ]
    });
  }

  async run(msg, args) {
    try {
      await msg.guild.ban(args.user, {reason: args.reason});
    } catch (err) {
      return util.Messenger.sendError(msg.channel, 'Unable to ban user: ' + args.user.tag);
    }
    return util.Messenger.send(msg.channel, '__**Reason:**__ ' + args.reason , 'Banned: ' + args.user.tag);
  }
}

module.exports = new Ban();
