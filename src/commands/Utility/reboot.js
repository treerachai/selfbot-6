const patron = require('patron.js');
const util = require('../../utility');

class Reboot extends patron.Command {
  constructor() {
    super({
      names: ['reboot'],
      groupName: 'utility',
      description: 'Reboots the selfbot',
      guildOnly: false
    });
  }

  async run(context) {
    console.log('Rebooting...'.red);
    return util.Messenger.sendTitle(context.channel, 'Rebooting...').then(() => process.exit(0));
  }
}

module.exports = new Reboot();
