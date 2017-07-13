const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Guildicon extends patron.Command {
  constructor() {
    super({
      name: 'guildicon',
      aliases: ['gi', 'guildavatar', 'ga'],
      group: 'fun',
      description: 'Get a guild\'s icon',
      guildOnly: true,
      args: [
        new patron.Argument({
          name: 'guild',
          key: 'guild',
          type: 'guild',
          example: 'Papa John\'s Selfbot',
          remainder: true,
          default: patron.Default.Guild
        })
      ]
    });
  }

  async run(msg, args) {
    const embed = new Discord.RichEmbed()
      .setTitle(args.guild.name + '\'s Icon')
      .setImage(args.guild.iconURL);
    return util.Messenger.sendEmbed(msg.channel, embed);
  }
}

module.exports = new Guildicon();
