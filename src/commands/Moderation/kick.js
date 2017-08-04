const patron = require('patron.js');
const util = require('../../utility');

class Kick extends patron.Command {
  constructor() {
    super({
      name: 'kick',
      group: 'moderation',
      description: 'Kick a member from the guild',
      botPermissions: ['KICK_MEMBERS'],
      args: [
        new patron.Argument({
          key: 'member',
          type: 'member',
          name: 'member',
          example: '"PeePee Juanathog#7643"'
        }),
        new patron.Argument({
          key: 'reason',
          type: 'string',
          name: 'reason',
          example: 'Get outta here the server',
          defaultValue: 'Kicked via PapaJohn#7777\'s Selfbot',
          remainder: true
        })        
      ]
    });
  }

  async run(msg, args) {
    try {
      await args.member.kick(args.reason);
    } catch (err) {
      return util.Messenger.sendError(msg.channel, 'Unable to kick member: ' + args.member.user.tag);
    }
    return util.Messenger.send(msg.channel, '__**Reason:**__ ' + args.reason , 'Kicked: ' + args.member.user.tag);
  }
}

module.exports = new Kick();
