const patron = require('patron.js');
const util = require('../../utility');
const emojis = [' :heart: ', ' :sparkling_heart: ', ' :broken_heart: ', ' :crossed_swords: '];

class LoveDetector extends patron.Command {
  constructor() {
    super({
      names: ['lovedetector', 'ld', 'lovemeter'],
      groupName: 'fun',
      description: 'See how much two people love each other',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'person 1',
          key: 'p1',
          type: 'string',
          example: '"Papa John"'
        }),
        new patron.Argument({
          name: 'person 2',
          key: 'p2',
          type: 'string',
          example: 'Papa John\'s Left Hand',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    let m = '';
    let emoji = emojis[0];
    const roll = util.Random.nextInt(0, 100);
    if (roll === 100) {
      m = 'What are you doing here and not in the bedroom right now? :smirk:';
      emoji = emojis[1];
    } else if (roll >= 90) {
      m = 'Maybe you guys should find a nice quiet place to take care of business.';
    } else if (roll >= 75) {
      m = 'Find a nice fancy restaraunt and see how things go.';
    } else if (roll >= 60) {
      m = 'Theres a chance you could work things out.';
    } else if (roll > 50) {
      m = 'It\'s worth a shot.';
    } else if (roll === 50) {
      m = 'I\'m on the fence about this one.';
    } else if (roll >= 40) {
      m = 'It\'s unlikely there\'s any chemistry there.';
      emoji = emojis[2];
    } else if (roll >= 25) {
      m = 'Maybe it just isn\'t meant to be';
      emoji = emojis[2];
    } else if (roll >= 1) {
      m = 'Why do you hate each other so much?';
      emoji = emojis[2];
    } else {
      m = 'Get out the gladitorial weaponary it looks like we have a battle on our hands.';
      emoji = emojis[3];
    }
    return util.Messenger.send(msg.channel, '**__Love Rating:__ ' + roll + '%**\n' + m, args.p1 + emoji + args.p2);
  }
}

module.exports = new LoveDetector();
