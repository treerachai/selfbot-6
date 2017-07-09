const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Discrim extends patron.Command {
  constructor() {
    super({
      name: 'discrim',
      aliases: ['discriminator'],
      group: 'utility',
      description: 'Finds users with the specified discriminator',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'discrim',
          key: 'discrim',
          type: 'string',
          example: '7777',
          isRemainder: true,
          default: patron.Default.Author.discriminator
        })
      ]
    });
  }

  async run(context, args) {
    const matches = context.client.users.findAll('discriminator', args.discrim);
    if (matches.length === 0){
      return util.Messenger.sendError(context.channel, 'No match found for discrim #' + args.discrim);
    } else {
      let message = '```css\n';
      let discrimc = 0;

       for (const user in matches) {
        discrimc++;
        message += matches[user].username + '#' + args.discrim;

        if (discrimc !== matches.length) message += ', ';
       }

      const embed = new Discord.RichEmbed()
         .setTitle('Results for Discrim #' + args.discrim)
         .setDescription(message + '```');
      util.Messenger.sendEmbed(context.channel, embed);
    }
  }
}

module.exports = new Discrim();
