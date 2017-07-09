const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Eval extends patron.Command {
  constructor() {
    super({
      name: 'eval',
      aliases: ['e'],
      group: 'utility',
      description: 'Evaluate JavaScript code',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'code',
          key: 'code',
          type: 'string',
          example: 'msg.author.tag',
          isRemainder: true
        })
      ]
    });
  }

  async run(msg, args) {
     try {
       let evaled = eval(args.code);
       if (typeof evaled !== 'string') {
         evaled = require('util').inspect(evaled);
       }
       const embed = new Discord.RichEmbed()
         .addField('Eval', '```js\n' + args.code + '```')
         .addField('Returns', '```js\n' + evaled + '```');
      return util.Messenger.sendEmbed(msg.channel, embed);
     } catch (err) {
       return util.Messenger.sendError(msg.channel, '```js\n' + err + '```');
     }
  }
}

module.exports = new Eval();
