const patron = require('patron.js');
const Minimum = require('../../preconditions/minimum.js');
const Maximum = require('../../preconditions/maximum.js');
const Decimal = require('../../preconditions/decimal.js');

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
          remainder: true,
          defaultValue: 10,
          preconditions: [new Minimum(1), new Maximum(100), new Decimal(0)]
        })
      ]
    });
  }

  async run(msg, args) {
    msg.channel.fetchMessages({
      limit: 100
    })
      .then(messages => {
        let msgArray = messages.array();
        msgArray = msgArray.filter(m => m.author.id === msg.client.user.id);
        msgArray.length = args.amount;
        msgArray.map(m => {
          m.delete()
            .catch(() => null);
        });
      });
  }
}

module.exports = new Prune();
