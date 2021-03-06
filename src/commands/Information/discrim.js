const patron = require('patron.js');
const util = require('../../utility');
const Isdiscrim = require('../../preconditions/isdiscrim.js');

class Discrim extends patron.Command {
  constructor() {
    super({
      names: ['discrim', 'discriminator'],
      groupName: 'information',
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

    const message = '```css\n' + util.StringUtil.commaList(matches.map((user) => {
      return user.tag;
    })) + '```';

    return util.Messenger.send(msg.channel, message, 'Results for Discrim #' + args.discrim);
  }
}

module.exports = new Discrim();
