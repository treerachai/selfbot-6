const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Userstats extends patron.Command {
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
          default: patron.Default.Member
        })
      ]
    });
  }

  async run(msg, args) {
     const embed = new Discord.RichEmbed()
      .setTitle(args.member.user.tag + ' (' + args.member.user.id + ')')
      .setThumbnail(args.member.user.displayAvatarURL)
      .addField('Status', args.member.user.presence.status, true)
      .addField('Account Created On', args.member.user.createdAt.toString().substring(0, 16), true)
      .addField('Nickname', '`' + args.member.displayName + '`', true)
      .addField('Highest Role', args.member.highestRole, true)
      .addField('Joined This Server On', args.member.joinedAt.toString().substring(0, 16), true);
      return util.Messenger.sendEmbed(msg.channel, embed, args.member.displayHexColor);

  }
}

module.exports = new Userstats();
