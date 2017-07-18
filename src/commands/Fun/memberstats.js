const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Memberstats extends patron.Command {
  constructor() {
    super({
      name: 'memberstats',
      aliases: ['ms', 'userstats', 'us'],
      group: 'fun',
      description: 'Get a member\'s statistics',
      guildOnly: true,
      args: [
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          example: 'PapaJohn#7777',
          remainder: true,
          defaultValue: patron.ArgumentDefault.Member
        })
      ]
    });
  }

  async run(msg, args) {
    const embed = new Discord.RichEmbed()
      .setTitle(args.member.user.tag + ' (' + args.member.user.id + ')')
      .setThumbnail(args.member.user.displayAvatarURL)
      .addField('Nickname', '`' + args.member.displayName + '`', true)
      .addField('Status', args.member.presence.status, true)
      .addField('Highest Role', args.member.highestRole, true);
    if (args.member.user.lastMessage !== null) {
      embed.addField('Last Message', args.member.lastMessage.createdAt.toString().substring(0, 24), true);
    }
    embed.addField('Account Created On', args.member.user.createdAt.toString().substring(0, 16), true)
      .addField('Joined This Server On', args.member.joinedAt.toString().substring(0, 16), true);
    return util.Messenger.sendEmbed(msg.channel, embed, args.member.displayHexColor);

  }
}

module.exports = new Memberstats();
