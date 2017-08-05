const patron = require('patron.js');
const Minimum = require('../../preconditions/minimum.js');

class Prune extends patron.Command {
  constructor() {
    super({
      name: 'prune',
      aliases: ['p'],
      group: 'utility',
      description: 'Deletes your last messages in the current channel',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'amount',
          key: 'amount',
          type: 'int',
          example: '10',
          remainder: true,
          defaultValue: 10,
          preconditions: [new Minimum(1)]
        })
      ]
    });
  }

  async run(msg, args) {
    let pruned = 0;
    for (let n = 0; n < args.amount; n += 24) {
      let search = await msg.channel.search({
        author: msg.author
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

module.exports = new Prune();
