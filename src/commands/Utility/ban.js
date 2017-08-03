const patron = require('patron.js');

class Ban extends patron.Command {
  constructor() {
    super({
      name: 'ban',
      group: 'utility',
      description: 'Ban any user.',
      botPermissions: ['BAN_MEMBERS'],
      args: [
        new patron.Argument({
          key: 'user',
          type: 'user',
          name: 'user',
          example: 'Bilbo Baggins#3838'
        })
      ]
    });
  }

  async run(msg, args) {
    return msg.guild.ban(args.user);
  }
}

module.exports = new Ban();
