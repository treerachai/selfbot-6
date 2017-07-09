const patron = require('patron.js');
const util = require('../../utility');

class Eightball extends patron.Command {
  constructor() {
    super({
      name: '8ball',
      aliases: ['8'],
      group: 'fun',
      description: 'Ask the Magical 8ball your question',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'question',
          key: 'question',
          type: 'string',
          example: 'Is the 8ball accurate?',
          isRemainder: true
        })
      ]
    });
  }

  async run(context, args) {
    const responses = [
      'Why certainly',
      'It is certain',
      'Absolutely',
      'Unavoidably so',
      'Without a doubt',
      'Most definitely',
      'As I see it, yes',
      'Most likely',
      'In your dreams',
      'Don\'t count on it',
      'Inevitably no',
      'Surely not',
      'My sources say no',
      'Not a chance buddy',
      'Not even a little bit',
      'Very doubtful'
    ];
    return util.Messenger.send(context.channel, ':8ball:: ' + util.Random.arrayElement(responses), 'Question: ' + args.question);
  }
}

module.exports = new Eightball();
