const patron = require('patron.js');
const Minimum = require('../../preconditions/minimum.js');

class Purge extends patron.Command {
  constructor() {
    super({
      names: ['purge'],
      groupName: 'moderation',
      description: 'Deletes a member\'s last messages in the current channel',
      botPermissions: ['MANAGE_MESSAGES'],
      args: [
        new patron.Argument({
          name: 'amount',
          key: 'amount',
          type: 'int',
          example: '10',
          defaultValue: 10,
          preconditions: [new Minimum(1)]
        }),
        new patron.Argument({
          name: 'member',
          key: 'member',
          type: 'member',
          example: 'Papi Juan#6545',
          remainder: true,
          defaultValue: patron.ArgumentDefault.Member
        })
      ]
    });
  }

  async run(msg, args) {
    let pruned = 0;
    for (let n = 0; n < args.amount; n += 24) {
      const search = await msg.channel.search({
        author: args.member.user,
        before: msg.createdAt
      });
      if (search.messages.length === 0) {
        break;
      }

      for (let i = 0; i < 24; i ++) {
        if (i >= search.messages.length || args.amount - n <= i) {
          break;
        }
        pruned++;
        await search.messages[i].find(m => m.hit).delete().catch(() => null);
      }
    }
    console.log('Successfully Pruned '.yellow + pruned.toString().magenta + ' messages'.yellow);
  }
}

module.exports = new Purge();
