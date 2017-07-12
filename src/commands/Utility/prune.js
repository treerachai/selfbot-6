const patron = require('patron.js');
const util = require('../../utility');
const Minimum = require('../../preconditions/minimum.js');
const Maximum = require('../../preconditions/maximum.js')

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
          type: 'float',
          example: '10',
          isRemainder: true,
          default: 10,
          preconditions: [new Minimum(1), new Maximum(100)]
        })
      ]
    });
  }

  async run(msg, args) {
    msg.channel.fetchMessages({
      limit: 100
    })
      .then(messages => {
        let msg_array = messages.array();
        msg_array = msg_array.filter(m => m.author.id === msg.client.user.id);
        msg_array.length = args.amount + 1;
        msg_array.map(m => {
            m.delete()
              .catch(() => null)
          });
      });
  }
}

module.exports = new Prune();
