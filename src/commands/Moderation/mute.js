const patron = require('patron.js');
const util = require('../../utility');

class Mute extends patron.Command {
  constructor() {
    super({
      names: ['mute'],
      groupName: 'moderation',
      description: 'Prevent a member from speaking in any text channel.',
      botPermissions: ['MANAGE_CHANNELS'],
      args: [
        new patron.Argument({
          key: 'member',
          type: 'member',
          name: 'member',
          example: 'PeePee Juanathog#7643',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const channels = msg.guild.channels.filterArray(c => c.type === 'text');
    for (let i = 0; i < channels.length; i++) {
      await channels[i].overwritePermissions(args.member.user, { 'SEND_MESSAGES': false });
    }
    return util.Messenger.sendTitle(msg.channel, 'Muted: ' + args.member.user.tag);
  }
}

module.exports = new Mute();
