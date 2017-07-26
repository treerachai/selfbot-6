const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Userid extends patron.Command {
  constructor() {
    super({
      name: 'userid',
      aliases: ['uid'],
      group: 'fun',
      description: 'Get the id of a user',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'user',
          key: 'user',
          type: 'user',
          example: 'PapaJohn#7777',
          remainder: true,
          defaultValue: patron.ArgumentDefault.Author
        })
      ]
    });
  }

  async run(msg, args) {
    const embed = new Discord.RichEmbed()
      .addField(args.user.tag + '\'s id', args.user.id, true)
      .setThumbnail(args.user.displayAvatarURL);

    return util.Messenger.sendEmbed(msg.channel, embed);
  }
}

module.exports = new Userid();
