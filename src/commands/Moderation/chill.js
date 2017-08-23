const patron = require('patron.js');
const util = require('../../utility');
const Minimum = require('../../preconditions/minimum.js');
const Maximum = require('../../preconditions/maximum.js');

class Chill extends patron.Command {
  constructor() {
    super({
      names: ['chill', 'freeze'],
      groupName: 'moderation',
      description: 'Prevents the @everyone role from speaking in the current channel for a given time',
      botPermissions: ['MANAGE_CHANNELS'],
      args: [
        new patron.Argument({
          name: 'delayInSeconds',
          key: 'delay',
          type: 'int',
          example: '86400',
          preconditions: [new Minimum(1), new Maximum(300)]
        })
      ]
    });
  }

  async run(msg, args) {
    await msg.channel.overwritePermissions(msg.guild.defaultRole, {
      'SEND_MESSAGES': false
    });
    await util.Messenger.sendTitle(msg.channel, 'Chat has been chilled for **' + args.delay + '** seconds');
    await util.PromiseUtil.delay(args.delay*1000);
    await msg.channel.overwritePermissions(msg.guild.defaultRole, {
      'SEND_MESSAGES': true
    });
    return util.Messenger.sendTitle(msg.channel, 'Chat has been thawed');
  }
}

module.exports = new Chill();
