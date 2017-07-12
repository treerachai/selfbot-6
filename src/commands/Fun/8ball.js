const patron = require('patron.js');
const util = require('../../utility');
const data = require('../../data.json');

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
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    return util.Messenger.send(msg.channel, ':8ball:: ' + util.Random.arrayElement(data.eightBallAnswers), 'Question: ' + args.question);
  }
}

module.exports = new Eightball();
