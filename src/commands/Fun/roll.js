const patron = require('patron.js');
const util = require('../../utility');
const Minimum = require('../../preconditions/minimum.js');

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
          isRemainder: true,
          default: '6',
          preconditions: [new Minimum(1)]
        })
      ]
    });
  }

  async run(context, args) {
      const roll = util.Random.nextInt(1, args.maxroll);
      return util.Messenger.send(context.channel, ':game_die: You rolled a ' + roll + ' out of ' + args.maxroll);
  }
}

module.exports = new Roll();
