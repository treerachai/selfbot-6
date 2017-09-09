const patron = require('patron.js');

class Boi extends patron.Command {
  constructor() {
    super({
      names: ['boi'],
      groupName: 'image',
      description: 'Use this when your buddy says something so stupid you dont even know how to respond',
      guildOnly: false
    });
  }

  async run(msg, args) {
    return msg.channel.send({ files: [{ attachment: 'src/resources/images/boi.png' }] });
  }
}

module.exports = new Boi();
