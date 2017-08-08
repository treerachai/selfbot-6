const patron = require('patron.js');
const util = require('../../utility');

class Uptime extends patron.Command {
  constructor() {
    super({
      names: ['uptime', 'ut'],
      groupName: 'statistics',
      description: 'See how long your selfbot has been running',
      guildOnly: false
    });
  }

  async run(msg) {
    const uptime = util.NumberUtil.msToTime(msg.client.uptime);
    return util.Messenger.send(msg.channel, uptime.hours + ' hours, ' + uptime.minutes + ' minutes, ' + uptime.seconds + ' seconds', 'Uptime');
  }
}

module.exports = new Uptime();
