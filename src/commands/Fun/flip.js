const patron = require('patron.js');
const util = require('../../utility');
const Minimum = require('../../preconditions/minimum.js');
const Maximum = require('../../preconditions/maximum.js');
const options = ['heads', 'tails'];

class Flip extends patron.Command {
  constructor() {
    super({
      names: ['flip', 'coinflip', 'coin'],
      groupName: 'fun',
      description: 'Flip up to 100,000 coins',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'amount',
          key: 'flips',
          type: 'int',
          example: '10',
          remainder: true,
          defaultValue: '1',
          preconditions: [new Minimum(1), new Maximum(100000)]
        })
      ]
    });
  }

  async run(msg, args) {
    if (args.flips > 1) {
      let heads = 0;
      let tails = 0;
      for (let i = 0; i < args.flips; i++) {
        const flip = util.Random.arrayElement(options);
        if (flip === 'heads') {
          heads++;
        } else {
          tails++;
        }
      }

      const headPercent = ((heads / args.flips) * 100).toFixed(2);
      const tailsPercent = (100 - headPercent).toFixed(2);

      return util.Messenger.send(msg.channel, '```ruby\nHeads: ' + heads + ' (' + headPercent + '%)\nTails: ' + tails + ' (' + tailsPercent + '%)```', 'Results of ' + args.flips + ' coin flips');
    }
    return util.Messenger.sendTitle(msg.channel, ':arrows_counterclockwise: The coin landed on: ' + util.StringUtil.upperFirstChar(util.Random.arrayElement(options)));
  }
}

module.exports = new Flip();
