const patron = require('patron.js');
const util = require('../../utility');

class Unban extends patron.Command {
  constructor() {
    super({
      names: ['unban'],
      groupName: 'moderation',
      description: 'Unban a banned user.',
      botPermissions: ['BAN_MEMBERS'],
      args: [
        new patron.Argument({
          key: 'user',
          type: 'banneduser',
          name: 'banned user',
          example: '"PeePee Juanathog#7643"',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    await msg.guild.unban(args.user);
    return util.Messenger.sendTitle(msg.channel, 'Unbanned: ' + args.user.tag);
  }
}

module.exports = new Unban();
