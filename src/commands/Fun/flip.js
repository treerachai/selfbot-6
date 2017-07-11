const patron = require('patron.js');
const util = require('../../utility');
const Minimum = require('../../preconditions/minimum.js');
const Maximum = require('../../preconditions/maximum.js')

class Flip extends patron.Command {
  constructor() {
    super({
      name: 'flip',
      aliases: ['coinflip', 'coin'],
      group: 'fun',
      description: 'Flip up to 100,000 coins',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'amount',
          key: 'flips',
          type: 'float',
          example: '10',
          isRemainder: true,
          default: '1',
          preconditions: [new Minimum(1), new Maximum(100000)]
        })
      ]
    });
  }

  async run(msg, args) {
    let heads = 0;
    let tails = 0;
    for (let i = 0; i < args.flips; i++) {
      let flip = Math.floor(Math.random() * 2);
      if (flip === 0) {
        heads++;
      } else {
        tails++;
      }
    }

    const headPercent = ((heads / args.flips) * 100).toFixed(2);
    const tailsPercent = (100 - headPercent).toFixed(2);

    return util.Messenger.send(msg.channel, '```ruby\nHeads: ' + heads + ' (' + headPercent + '%)\nTails: ' + tails + ' (' + tailsPercent + '%)```', 'Results of ' + args.flips + ' coin flips');
  }
}

module.exports = new Flip();
