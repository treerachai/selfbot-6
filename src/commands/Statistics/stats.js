const patron = require('patron.js');
const util = require('../../utility');

class Stats extends patron.Command {
  constructor() {
    super({
      names: ['stats'],
      groupName: 'statistics',
      description: 'See some statistics about the Selfbot',
      guildOnly: false
    });
  }

  async run(msg) {
    const uptime = util.NumberUtil.msToTime(msg.client.uptime);
    return util.Messenger.sendFields(msg.channel, [
      'Ping', util.NumberUtil.addCommas(msg.client.ping.toFixed(0)) + ' ms',
      'Memory', (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB',
      'Uptime', uptime.hours + ' hours, ' + uptime.minutes + ' minutes',
      'Servers', msg.client.guilds.size,
      'Channels', util.NumberUtil.addCommas(msg.client.channels.size),
      'Users', util.NumberUtil.addCommas(msg.client.users.size)
    ], true );
  }
}

module.exports = new Stats();
