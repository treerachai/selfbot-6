const patron = require('patron.js');
const util = require('../../utility');

class Reboot extends patron.Command {
  constructor() {
    super({
      name: 'reboot',
      group: 'utility',
      description: 'Reboots the selfbot',
      guildOnly: false
    });
  }

  async run(context) {
    return util.Messenger.send(context.channel, 'Rebooting...').then(() => process.exit(1));
  }
}

module.exports = new Reboot();
