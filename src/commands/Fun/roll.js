const patron = require('patron.js');
const util = require('../../utility');
const Minimum = require('../../preconditions/minimum.js');
const Decimal = require('../../preconditions/decimal.js');
const Discord = require('discord.js');

class Roll extends patron.Command {
  constructor() {
    super({
      name: 'roll',
      group: 'fun',
      description: 'Rolls a random number',
      guildOnly: false, 
      args: [
        new patron.Argument({
          name: 'Max Roll',
          key: 'maxroll',
          type: 'float',
          example: '100',
          remainder: true,
          defaultValue: 6,
          preconditions: [new Minimum(1), new Decimal(0)]
        })
      ]
    });
  }

  async run(msg, args) {
    const roll = util.Random.nextInt(1, args.maxroll);
    const embed = new Discord.RichEmbed()
      .setTitle(':game_die: You rolled a ' + roll + ' out of ' + args.maxroll);
    return util.Messenger.sendEmbed(msg.channel, embed);
  }
}

module.exports = new Roll();
