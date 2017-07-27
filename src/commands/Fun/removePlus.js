const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class RemovePlus extends patron.Command {
  constructor() {
    super({
      name: 'removeplus',
      aliases: ['rp', 'rplus', 'r+'],
      group: 'fun',
      description: 'Sends <message> then deletes it',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'message',
          key: 'message',
          type: 'string',
          example: 'No way hoe zay',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const m = await msg.channel.send(args.message);
    m.delete();
  }
}

module.exports = new RemovePlus();
