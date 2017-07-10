const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Uptime extends patron.Command {
  constructor() {
    super({
      name: 'uptime',
      aliases: ['ut'],
      group: 'utility',
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
