const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');
const answers = ['Why certainly', 'It is certain', 'Absolutely', 'Unavoidably so', 'Without a doubt', 'Most definitely', 'As I see it, yes', 'Most likely', 'In your dreams',
  'Don\'t count on it', 'Inevitably no', 'Surely not', 'My sources say no', 'Not a chance buddy', 'Not even a little bit', 'Very doubtful'];

class Eightball extends patron.Command {
  constructor() {
    super({
      names: ['8ball', '8'],
      groupName: 'fun',
      description: 'Ask the magic 8ball your question',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'question',
          key: 'question',
          type: 'string',
          example: 'Is the 8ball accurate?',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const embed = new Discord.RichEmbed()
      .setAuthor(util.StringUtil.cleanContent(msg, args.question), msg.author.displayAvatarURL)
      .setDescription(':8ball:: ' + util.Random.arrayElement(answers));
    return util.Messenger.sendEmbed(msg.channel, embed);
  }
}

module.exports = new Eightball();
