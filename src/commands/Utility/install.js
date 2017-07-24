const patron = require('patron.js');
const util = require('../../utility');

class Install extends patron.Command {
  constructor() {
    super({
      name: 'install',
      aliases: ['download', 'setup'],
      group: 'utility',
      description: 'Get a link to the setup page for this Selfbot',
      guildOnly: false
    });
  }

  async run(msg) {
    return util.Messenger.send(msg.channel, 'https://vapidslay.github.io/selfbot/setup/', 'Install Instructions for This Selfbot can be Found Here:');
  }
}

module.exports = new Install();
