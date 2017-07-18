const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Guildstats extends patron.Command {
  constructor() {
    super({
      name: 'guildstats',
      aliases: ['gs', 'serverstats', 'ss'],
      group: 'fun',
      description: 'Get a guild\'s statistics',
      guildOnly: true,
      args: [
        new patron.Argument({
          name: 'guild',
          key: 'guild',
          type: 'guild',
          example: 'Papa John\'s Selfbot',
          remainder: true,
          defaultValue: patron.ArgumentDefault.Guild
        })
      ]
    });
  }

  async run(msg, args) {
    const embed = new Discord.RichEmbed()
      .setTitle(args.guild.name)
      .setThumbnail(args.guild.iconURL);
    if (args.guild.owner !== null) {
      embed.addField('Guild Owner', '`' + args.guild.owner.user.tag + '`', true);
    }
    embed.addField('Members', args.guild.memberCount, true)
      .addField('Channels', args.guild.channels.array().length, true)
      .addField('Region', args.guild.region, true)
      .addField('Created At', args.guild.createdAt.toString().substring(0, 16), true);

    return util.Messenger.sendEmbed(msg.channel, embed);
  }
}

module.exports = new Guildstats();
