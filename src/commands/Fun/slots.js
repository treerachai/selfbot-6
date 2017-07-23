const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');
const Minimum = require('../../preconditions/minimum.js');
const Maximum = require('../../preconditions/maximum.js');
const Decimal = require('../../preconditions/decimal.js');

class Slots extends patron.Command {
  constructor() {
    super({
      name: 'slots',
      aliases: ['slot', 'slotmachine'],
      group: 'fun',
      description: 'Play a Slot Machine',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'Bet',
          key: 'bet',
          type: 'float',
          example: '1000',
          remainder: true,
          defaultValue: 10,
          preconditions: [new Minimum(0.01), new Maximum(1000000), new Decimal(2)]
        })
      ]
    });
  }

  async run(msg, args) {
    const options = [':seven: ', ':cherries: ', ':lemon: ', ':grapes: ', ':strawberry: '];
    const o1 = util.Random.arrayElement(options);
    const o2 = util.Random.arrayElement(options);
    const o3 = util.Random.arrayElement(options);

    let winMessage = 'Better Luck Next Time. You lost: ' + util.NumberUtil.toUSD(args.bet);
    if (o1 === o2 && o1 === o3) {
      if (o1 === ':seven: ') {
        winMessage = 'JACKPOT! You won: ' + util.NumberUtil.toUSD(args.bet * 777);
      } else {
        winMessage = 'Big Win! You won: ' + util.NumberUtil.toUSD(args.bet * 111);
      }
    } else if (o1 === o2) {
      winMessage = 'Small Win! You won: ' + util.NumberUtil.toUSD(args.bet * 2);
    }

    const embed = new Discord.RichEmbed()
      .setTitle('🎰 Slot Machine')
      .setDescription(o1 + o2 + o3)
      .setFooter(winMessage);

    return util.Messenger.sendEmbed(msg.channel, embed);
  }
}

module.exports = new Slots();
