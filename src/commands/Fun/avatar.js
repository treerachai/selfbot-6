const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Avatar extends patron.Command {
  constructor() {
    super({
      name: 'avatar',
      aliases: ['a'],
      group: 'fun',
      description: 'Get the avatar of a user',
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
      .setTitle(args.user.tag + '\'s Avatar')
      .setImage(args.user.displayAvatarURL);

    return util.Messenger.sendEmbed(msg.channel, embed);
  }
}

module.exports = new Avatar();
