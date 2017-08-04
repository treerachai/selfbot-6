const patron = require('patron.js');
const util = require('../../utility');

class Unban extends patron.Command {
  constructor() {
    super({
      name: 'unban',
      group: 'moderation',
      description: 'Unban a banned user.',
      botPermissions: ['BAN_MEMBERS'],
      args: [
        new patron.Argument({
          key: 'username',
          type: 'string',
          name: 'username',
          example: '"PeePee Juanathog#7643"',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const fetchedBans = await msg.guild.fetchBans();
    const lowerInput = args.username.toLowerCase();
    const matches = fetchedBans.filterArray(x => (x.username + '#' + x.discriminator).toLowerCase().includes(lowerInput));

    if (matches.length === 1) {
      const user = matches[0];

      await msg.guild.unban(user);
      return util.Messenger.send(msg.channel, '__**ID:**__ ' + user.id , 'Unbanned: ' + user.tag);
    } else if (matches.length > 5) {
      return util.Messenger.sendError(msg.channel, 'Multiple matches found, please be more specific.');
    } else if (matches.length > 1) {
      const formattedMatches = util.StringUtil.formatUsers(matches);

      return util.Messenger.sendError(msg.channel, 'Multiple matches found: ' + formattedMatches + '.');
    }

    return util.Messenger.sendError(msg.channel, 'No matches found.');
  }
}

module.exports = new Unban();
