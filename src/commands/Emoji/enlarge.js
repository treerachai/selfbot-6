const patron = require('patron.js');

class Enlarge extends patron.Command {
  constructor() {
    super({
      names: ['enlarge', 'el', 'womboji', 'wumbo'],
      groupName: 'emoji',
      description: 'Send a full-size version of a custom emoji',
      guildOnly: false,
      botPermissions: ['ATTACH_FILES'],
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
    return msg.channel.send({ files: [{ attachment: args.emoji.url, name: args.emoji.name + '.png' }] });
  }
}

module.exports = new Enlarge();
