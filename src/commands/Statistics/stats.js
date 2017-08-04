const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Stats extends patron.Command {
  constructor() {
    super({
      name: 'stats',
      group: 'statistics',
      description: 'See some statistics about the Selfbot',
      guildOnly: false
    });
  }

  async run(msg) {
    const uptime = util.NumberUtil.msToTime(msg.client.uptime);
    const embed = new Discord.RichEmbed()
      .addField('Ping', msg.client.ping.toFixed(0) + ' ms', true)
      .addField('Memory', (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + ' MB', true)
      .addField('Uptime', uptime.hours + ' hours, ' + uptime.minutes + ' minutes', true)
      .addField('Servers', msg.client.guilds.size, true)
      .addField('Channels', msg.client.channels.size, true)
      .addField('Users', msg.client.users.size, true);
    return util.Messenger.sendEmbed(msg.channel, embed);
  }
}

module.exports = new Stats();
