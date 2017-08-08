const patron = require('patron.js');

class Shrug extends patron.Command {
  constructor() {
    super({
      names: ['shrug', 's'],
      groupName: 'emote',
      description: 'Works like the desktop /shrug command',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'text',
          type: 'string',
          example: 'I don\'t know',
          remainder: true,
          defaultValue: ''
        })
      ]
    });
  }

  async run(msg, args) {
    return msg.channel.send(args.text + ' ¯\\_(ツ)_/¯');
  }
}

module.exports = new Shrug();
