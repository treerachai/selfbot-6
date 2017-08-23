const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');
const arrayEven = require('../../preconditions/arrayEven.js');

class CustomEmbed extends patron.Command {
  constructor() {
    super({
      names: ['customembed', 'ce'],
      groupName: 'messager',
      description: 'Allows you to send more customized embeds. To skip an arg, use " "',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'description',
          key: 'description',
          type: 'string',
          example: '"embed description"'
        }),
        new patron.Argument({
          name: 'title',
          key: 'title',
          type: 'string',
          example: '"embed title"',
          defaultValue: ' '
        }),
        new patron.Argument({
          name: 'footer',
          key: 'footer',
          type: 'string',
          example: '"embed footer"',
          defaultValue: ' '
        }),
        new patron.Argument({
          name: 'image',
          key: 'image',
          type: 'string',
          example: '[ImageURL]',
          defaultValue: ''
        }),
        new patron.Argument({
          name: 'thumbnail',
          key: 'thumbnail',
          type: 'string',
          example: '[ImageURL]',
          defaultValue: ''
        }),
        new patron.Argument({
          name: 'fields',
          key: 'fields',
          type: 'string',
          example: '"field title" "field description"',
          infinite: true,
          defaultValue: [],
          preconditions: [new arrayEven(true)]
        })
      ]
    });
  }

  async run(msg, args) {
    const embed = new Discord.RichEmbed()
      .setDescription(args.description)
      .setTitle(args.title)
      .setFooter(args.footer);
    if (!util.StringUtil.isNullOrWhiteSpace(args.image)) {
      embed.setImage(args.image);
    }
    if (!util.StringUtil.isNullOrWhiteSpace(args.thumbnail)) {
      embed.setThumbnail(args.thumbnail);
    }

    if (args.fields.length !== 0) {
      for (let i = 0; i < args.fields.length; i+=2) {
        embed.addField(args.fields[i], args.fields[i+1], true);
      }
    }
    return util.Messenger.sendEmbed(msg.channel, embed);
  }
}

module.exports = new CustomEmbed();
