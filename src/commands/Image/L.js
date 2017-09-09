const patron = require('patron.js');

class L extends patron.Command {
  constructor() {
    super({
      names: ['l', 'takethel'],
      groupName: 'image',
      description: 'Use this when someone needs to just take the L',
      guildOnly: false
    });
  }

  async run(msg, args) {
    return msg.channel.send({ files: [{ attachment: 'src/resources/images/l.png' }] });
  }
}

module.exports = new L();
