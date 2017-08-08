const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');
const MustBe = require('../../preconditions/mustBe.js');

class Rps extends patron.Command {
  constructor() {
    super({
      names: ['rps'],
      groupName: 'fun',
      description: 'Play Rock, Paper, Scissors against the selfbot',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'choice',
          key: 'choice',
          type: 'string',
          example: 'scissors',
          preconditions: [new MustBe(['rock', 'paper', 'scissors'])]
        })
      ]
    });
  }

  async run(msg, args) {
    const choice = args.choice.charAt(0).toUpperCase() + args.choice.slice(1);
    const botOptions = ['Rock', 'Paper', 'Scissors'];
    const botChoice = util.Random.arrayElement(botOptions);

    let winMessage = 'You Lose!';
    if (botChoice === choice) {
      winMessage = 'It\'s a Tie!';
    } else if (choice === 'Rock' && botChoice === 'Scissors') {
      winMessage = 'You Win!';
    } else if (choice === 'Paper' && botChoice === 'Rock') {
      winMessage = 'You Win!';
    } else if (choice === 'Scissors' && botChoice === 'Paper') {
      winMessage = 'You Win!';
    }

    const embed = new Discord.RichEmbed()
      .setTitle(':full_moon: :page_facing_up: :scissors: - ' + winMessage + ' - :scissors: :page_facing_up: :full_moon:')
      .addField('Your Choice', choice, true)
      .addField('Bot Choice', botChoice, true);
    return util.Messenger.sendEmbed(msg.channel, embed);
  }
}

module.exports = new Rps();
