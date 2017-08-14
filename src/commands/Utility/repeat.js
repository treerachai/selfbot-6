const patron = require('patron.js');
const util = require('../../utility');
const Minimum = require('../../preconditions/minimum.js');
const Maximum = require('../../preconditions/maximum.js');
const Decimal = require('../../preconditions/decimal.js');

class Repeat extends patron.Command {
  constructor() {
    super({
      names: ['repeat', 'schedule', 'spam'],
      groupName: 'utility',
      description: 'Schedule a message to send in the current channel',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'delayInSeconds',
          key: 'delay',
          type: 'float',
          example: '86400',
          preconditions: [new Minimum(0.001), new Maximum(86400), new Decimal(3)]
        }),
        new patron.Argument({
          name: 'amount',
          key: 'amount',
          type: 'int',
          example: '10',
          preconditions: [new Minimum(1), new Maximum(100)]
        }),
        new patron.Argument({
          name: 'message',
          key: 'm',
          type: 'string',
          example: 'Good morning',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    for(let i = 0; i < args.amount; i++) {
      await util.PromiseUtil.delay(1000 * args.delay);
      await msg.channel.send(args.m).catch(() => null);
    }
    console.log('Repeat Finished: '.yellow + util.StringUtil.cleanContent(msg, args.m).magenta);
  }
}

module.exports = new Repeat();
