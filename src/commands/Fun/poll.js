const patron = require('patron.js');
const util = require('../../utility');
const ArrayLength = require('../../preconditions/ArrayLength.js');
const CharLimit = require('../../preconditions/charLimit.js');
const uninumbers = ['0⃣', '1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣'];

class Poll extends patron.Command {
  constructor() {
    super({
      names: ['poll', 'createpoll'],
      groupName: 'fun',
      description: 'Create a poll with up to 9 options',
      botPermissions: ['ADD_REACTIONS'],
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'title',
          key: 'title',
          type: 'string',
          example: '"What is the best type of pizza"',
          preconditions: [new CharLimit(256)]
        }),
        new patron.Argument({
          name: 'choice',
          key: 'choices',
          type: 'string',
          example: '"Papa John\'s Pizza" "Domino\'s Pizza" "Little Caesar\'s Pizza"',
          infinite: true,
          preconditions: [new ArrayLength(2, 9)]
        })
      ]
    });
  }

  async run(msg, args) {
    let str = '';
    for (let i = 0; i < args.choices.length; i++) {
      str += uninumbers[i+1] + ' `' + args.choices[i] + '`\n';
    }
    str = str.substring(0, str.length - 1);

    const m = await util.Messenger.send(msg.channel, str, ':ballot_box: ' + args.title);
    if (m !== null) {
      for (let i = 1; i <= args.choices.length; i++) {
        await m.react(uninumbers[i]);
      }
    }
  }
}

module.exports = new Poll();
