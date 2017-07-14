const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Calc extends patron.Command {
  constructor() {
    super({
      name: 'calc',
      aliases: ['calculate', 'calculator'],
      group: 'utility',
      description: 'Do basic adding, subtracting, multiplying, and dividing',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'problem',
          key: 'input',
          type: 'string',
          example: '3*(2+3)/4-2',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const code = args.input.replace(/[^0-9+\-*/().]/gi, '');
    if (!code) {
      return util.Messenger.sendError(msg.channel, 'You must provide something valid to calculate');
    }
    try {
      let answer = eval(code);
      if (typeof answer !== 'string') {
        answer = require('util').inspect(answer);
      }
      const embed = new Discord.RichEmbed()
        .setTitle('Calculator')
        .setDescription('```js\n' + code + ' = ' + answer + '```');
      return util.Messenger.sendEmbed(msg.channel, embed);
    } catch (err) {
      return util.Messenger.sendError(msg.channel, '```js\n' + err + '```');
    }

  }
}

module.exports = new Calc();
