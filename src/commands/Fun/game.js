const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Game extends patron.Command {
  constructor() {
    super({
      name: 'game',
      aliases: ['g'],
      group: 'fun',
      description: 'Shows what game a user is playing',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'user',
          key: 'user',
          type: 'user',
          example: 'I don\'t know',
          remainder: true,
          default: patron.Default.Author
        })
      ]
    });
  }

  async run(msg, args) {
    if (args.user.presence.game !== null) {
      return util.Messenger.send(msg.channel, '`' + args.user.tag + '` is playing: `' + args.user.presence.game.name + '`');
    } else {
      return util.Messenger.send(msg.channel, '`' + args.user.tag + '` is not currently playing a game');
    }
  }
}

module.exports = new Game();
