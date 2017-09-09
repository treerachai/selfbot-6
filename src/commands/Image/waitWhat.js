const patron = require('patron.js');

class WaitWhat extends patron.Command {
  constructor() {
    super({
      names: ['waitwhat', 'ww', 'confused'],
      groupName: 'image',
      description: 'Useful for when your pal says something that makes absolutely no sense',
      guildOnly: false
    });
  }

  async run(msg, args) {
    return msg.channel.send({ files: [{ attachment: 'src/resources/images/waitwhat.jpg' }] });
  }
}

module.exports = new WaitWhat();
