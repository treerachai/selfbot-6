const patron = require('patron.js');
const util = require('../../utility');

class Unmute extends patron.Command {
  constructor() {
    super({
      names: ['unmute'],
      groupName: 'moderation',
      description: 'Unmute a muted member.',
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
      if (channels[i].permissionOverwrites.get(args.member.user.id) !== undefined) {
        await channels[i].permissionOverwrites.get(args.member.user.id).delete();
      } else {
        await channels[i].overwritePermissions(args.member.user, {});
      }
    }
    return util.Messenger.sendTitle(msg.channel, 'Unmuted: ' + args.member.user.tag);
  }
}

module.exports = new Unmute();
