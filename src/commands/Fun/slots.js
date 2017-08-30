const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');
const Minimum = require('../../preconditions/minimum.js');
const Maximum = require('../../preconditions/maximum.js');
const Decimal = require('../../preconditions/decimal.js');
const options = [':seven: ', ':cherries: ', ':lemon: ', ':grapes: ', ':strawberry: '];

class Slots extends patron.Command {
  constructor() {
    super({
      names: ['slots', 'slot', 'slotmachine'],
      groupName: 'fun',
      description: 'Play a Slot Machine',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'Bet',
          key: 'bet',
          type: 'currency',
          example: '1000',
          remainder: true,
          defaultValue: 10,
          preconditions: [new Minimum(0.01), new Maximum(1000000), new Decimal(2)]
        })
      ]
    });
  }

  async run(msg, args) {
    const o1 = util.Random.arrayElement(options);
    const o2 = util.Random.arrayElement(options);
    const o3 = util.Random.arrayElement(options);

    let winMessage = 'Better Luck Next Time. You lost: ' + util.NumberUtil.toUSD(args.bet);
    if (o1 === o2 && o1 === o3) {                                   //Odds:Payout Ratio: 0.9
      if (o1 === ':seven: ') {                                      //Odds: 0.008
        winMessage = 'JACKPOT! You won: ' + util.NumberUtil.toUSD(args.bet * 112.5);
      } else {                                                      //Odds: 0.032
        winMessage = 'Big Win! You won: ' + util.NumberUtil.toUSD(args.bet * 28.125);
      }
    } else if (o1 === o2) {                                         //Odds: 0.20
      winMessage = 'Small Win! You won: ' + util.NumberUtil.toUSD(args.bet * 4.5);
    }

    const embed = new Discord.RichEmbed()
      .setTitle(':slot_machine: Slot Machine :slot_machine:')
      .setDescription(o1 + o2 + o3)
      .setFooter(winMessage);

    return util.Messenger.sendEmbed(msg.channel, embed);
  }
}

module.exports = new Slots();
