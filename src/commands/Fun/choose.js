const patron = require('patron.js');
const util = require('../../utility');
const data = require('../../data.json');

class Choose extends patron.Command {
  constructor() {
    super({
      name: 'choose',
      aliases: ['ch'],
      group: 'fun',
      description: 'Have the Selfbot help you choose between a set of options',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'choice',
          key: 'choices',
          type: 'string',
          example: '\"Papa John\'s Pizza\"',
          infinite: true
        })
      ]
    });
  }

  async run(msg, args) {
    let message = 'Out of: '
    for (const element of args.choices) {
      message += '`' + element + '`';
      if (element !== args.choices[args.choices.length-1]) {
        message += ', ';
      }
    }
    const choice = util.Random.arrayElement(args.choices);
    message += '\nI choose: `' + choice + '`';
    return util.Messenger.send(msg.channel, message);
  }
}

module.exports = new Choose();
