const patron = require('patron.js');
const util = require('../../utility');
const Minimum = require('../../preconditions/minimum.js');
const Maximum = require('../../preconditions/maximum.js');

class Softban extends patron.Command {
  constructor() {
    super({
      names: ['softban'],
      groupName: 'moderation',
      description: 'Softban a user to delete their messages',
      botPermissions: ['BAN_MEMBERS'],
      args: [
        new patron.Argument({
          key: 'user',
          type: 'user',
          name: 'user',
          example: '"PeePee Juanathog#7643"'
        }),
        new patron.Argument({
          key: 'days',
          type: 'int',
          name: 'days to delete',
          example: '2',
          defaultValue: 1,
          preconditions: [new Minimum(0), new Maximum(7)]
        }),
        new patron.Argument({
          key: 'reason',
          type: 'string',
          name: 'reason',
          example: 'Raiding the server',
          defaultValue: 'Softbanned via PapaJohn#7777\'s Selfbot',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    //    try {
    await msg.guild.ban(args.user, { reason: args.reason, days: args.days });
    await msg.guild.unban(args.user);
    //    } catch (err) {
    //      return util.Messenger.sendError(msg.channel, 'A problem occured softbanning: ' + args.user.tag);
    //    }
    return util.Messenger.send(msg.channel, '__**Messages Removed:**__ ' + args.days + ' days\n__**Reason:**__ ' + args.reason, 'Softbanned: ' + args.user.tag);
  }
}

module.exports = new Softban();
