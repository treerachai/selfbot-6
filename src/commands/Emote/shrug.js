const patron = require('patron.js');
const util = require('../../utility');

class Shrug extends patron.Command {
  constructor() {
    super({
      name: 'shrug',
      aliases: ['s'],
      group: 'emote',
      description: 'Adds "¯\\_(ツ)_/¯" to your message',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'text',
          type: 'string',
          example: 'I don\'t know',
          isRemainder: true,
          default: ''
        })
      ]
    });
  }

  async run(msg, args) {
    return msg.channel.send(args.text + ' ¯\\_(ツ)_/¯');
  }
}

module.exports = new Shrug();
