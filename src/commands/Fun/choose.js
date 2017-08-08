const patron = require('patron.js');
const util = require('../../utility');

class Choose extends patron.Command {
  constructor() {
    super({
      names: ['choose', 'ch'],
      groupName: 'fun',
      description: 'Have the Selfbot help you choose between a set of options',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'choice',
          key: 'choices',
          type: 'string',
          example: '"Papa John\'s Pizza" "Domino\'s Pizza" "Little Caesar\'s Pizza',
          infinite: true
        })
      ]
    });
  }

  async run(msg, args) {
    let message = 'Out of: ';
    for (let i = 0; i < args.choices.length; i++) {
      message += '`' + args.choices[i] + '`' + (i !== args.choices.length-1 ? ', ' : '\n');
    }
    const choice = util.Random.arrayElement(args.choices);
    message += 'I choose: `' + choice + '`';
    return util.Messenger.send(msg.channel, message);
  }
}

module.exports = new Choose();
