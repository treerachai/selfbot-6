const patron = require('patron.js');

class Reverse extends patron.Command {
  constructor() {
    super({
      names: ['reverse', 'back', 'nou'],
      groupName: 'image',
      description: 'Sends an image of an Uno reverse card',
      guildOnly: false
    });
  }

  async run(msg, args) {
    return msg.channel.send({ files: [{ attachment: 'src/resources/images/reverse.png' }] });
  }
}

module.exports = new Reverse();
