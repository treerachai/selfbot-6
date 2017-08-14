const patron = require('patron.js');
const util = require('../../utility');

class Git extends patron.Command {
  constructor() {
    super({
      names: ['git', 'github', 'repo', 'repository'],
      groupName: 'information',
      description: 'Get a link to this Selfbot\'s Github Repository',
      guildOnly: false
    });
  }

  async run(msg) {
    return util.Messenger.send(msg.channel, 'https://github.com/VapidSlay/selfbot', 'This Selfbot\'s Respoitory');
  }
}

module.exports = new Git();
