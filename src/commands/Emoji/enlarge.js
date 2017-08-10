const patron = require('patron.js');

class Enlarge extends patron.Command {
  constructor() {
    super({
      names: ['enlarge', 'el', 'womboji', 'wumbo'],
      groupName: 'emoji',
      description: 'Send a full-size version of a custom emoji',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'emoji',
          key: 'emoji',
          type: 'emoji',
          example: ':thonk:',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    msg.channel.send({ files: [args.emoji.url] }).catch(() => null);
  }
}

module.exports = new Enlarge();
