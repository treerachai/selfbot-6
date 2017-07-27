const patron = require('patron.js');
const util = require('../../utility');
const colors = require('colors');

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
    console.log('Rebooting...'.red);
    return util.Messenger.send(context.channel, 'Rebooting...').then(() => process.exit(0));
  }
}

module.exports = new Reboot();
