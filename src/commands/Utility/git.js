const patron = require('patron.js');
const util = require('../../utility');

class Git extends patron.Command {
  constructor() {
    super({
      name: 'git',
      aliases: ['github', 'repo', 'repository'],
      group: 'utility',
      description: 'Get a link to this Selfbot\'s Github Repository',
      guildOnly: false
    });
  }

  async run(msg) {
    return util.Messenger.send(msg.channel, 'https://github.com/VapidSlay/selfBot', 'This Selfbot\'s Respoitory');
  }
}

module.exports = new Git();
