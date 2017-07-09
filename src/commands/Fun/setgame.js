const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Setgame extends patron.Command {
  constructor() {
    super({
      name: 'setgame',
      aliases: ['sg'],
      group: 'fun',
      description: 'Sets what game you are playing',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'name',
          key: 'name',
          type: 'string',
          example: 'with himself',
          isRemainder: true,
          default: null
        })
      ]
    });
  }

  async run(msg, args) {
    msg.client.user.setGame(args.name.substring(0, 128));
  }
}

module.exports = new Setgame();
