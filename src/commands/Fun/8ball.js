const patron = require('patron.js');
const util = require('../../utility');
const data = require('../../data.json');
const Discord = require('discord.js');

class Eightball extends patron.Command {
  constructor() {
    super({
      name: '8ball',
      aliases: ['8'],
      group: 'fun',
      description: 'Ask the Magical 8ball your question',
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
      .setAuthor(args.question, msg.author.displayAvatarURL)
      .setDescription(':8ball:: ' + util.Random.arrayElement(data.eightBallAnswers));
    return util.Messenger.sendEmbed(msg.channel, embed);
  }
}

module.exports = new Eightball();
