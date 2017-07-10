const patron = require('patron.js');
const util = require('../../utility');

class Download extends patron.Command {
  constructor() {
    super({
      name: 'download',
      aliases: ['git', 'github'],
      group: 'utility',
      description: 'Get a link to this Selfbot\'s Github Repository',
      guildOnly: false
    });
  }

  async run(msg) {
    return util.Messenger.send(msg.channel, 'https://github.com/VapidSlay/SelfBot', 'This Selfbot\'s Respoitory and Install Instructions');
  }
}

module.exports = new Download();
