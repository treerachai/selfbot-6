const patron = require('patron.js');
const util = require('../../utility');
const os = require('os');

class Host extends patron.Command {
  constructor() {
    super({
      names: ['host', 'hoststats'],
      groupName: 'statistics',
      description: 'See some statistics about the host of your selfbot',
      guildOnly: false
    });
  }

  async run(msg) {
    const uptime = util.NumberUtil.msToTime(Math.floor(os.uptime()*1000));
    const cpus = os.cpus();
    const totalMemory = (os.totalmem() / 1024 / 1024 /1024).toFixed(2);
    const freeMemory = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
    return util.Messenger.sendFields(msg.channel, [
      'Platform', os.platform(),
      'Host Uptime', uptime.hours + ' hours, ' + uptime.minutes + ' minutes',
      'Cpu/Core Count', cpus.length,
      'Cpu Speed', cpus[0].speed + ' MHz',
      'CPU Architecture', os.arch(),
      'Free Memory', freeMemory + ' GB/' + totalMemory + ' GB'
    ], true );
  }
}

module.exports = new Host();
