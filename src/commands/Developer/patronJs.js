const patron = require('patron.js');
const util = require('../../utility');

class Patronjs extends patron.Command {
  constructor() {
    super({
      names: ['patron', 'pjs', 'patronjs', 'patron.js', 'p.js'],
      groupName: 'developer',
      description: 'Get a link to the Patron.js docs',
      guildOnly: false
    });
  }

  async run(msg) {
    return util.Messenger.send(msg.channel, 'https://realblazeit.github.io/patron.js',
      'This Selfbot uses the Patron.js framework');
  }
}

module.exports = new Patronjs();
