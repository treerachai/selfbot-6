const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');
const Isdiscrim = require('../../preconditions/isdiscrim.js');

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
          preconditions: [new Isdiscrim()]
        })
      ]
    });
  }

  async run(msg, args) {
    const matches = msg.client.users.findAll('discriminator', args.discrim);

    if (matches.length === 0) {
      return util.Messenger.sendError(msg.channel, 'No match found for discrim #' + args.discrim + '\nJoin more guilds to add to the list of potential matches.');
    }

    let message = '```css\n';

    for (let i = 0; i < matches.length; i++) {
      message += matches[i].tag;

      if (i !== matches.length) {
        message += ', ';
      }
    }

    return util.Messenger.send(msg.channel, message + '```', 'Results for Discrim #' + args.discrim);
  }
}

module.exports = new Discrim();
