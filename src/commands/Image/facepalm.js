const patron = require('patron.js');

class Facepalm extends patron.Command {
  constructor() {
    super({
      names: ['facepalm', 'fp', 'failfish'],
      groupName: 'image',
      description: 'Give your buddy the classic facepalm when he says something stupid',
      guildOnly: false
    });
  }

  async run(msg, args) {
    return msg.channel.send({ files: [{ attachment: 'src/resources/images/facepalm.jpg' }] });
  }
}

module.exports = new Facepalm();
