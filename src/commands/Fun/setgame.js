const patron = require('patron.js');

class Setgame extends patron.Command {
  constructor() {
    super({
      name: 'setgame',
      aliases: ['sg'],
      group: 'fun',
      description: 'Sets what game you are playing',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'name',
          key: 'name',
          type: 'string',
          example: 'with himself',
          remainder: true,
          defaultValue: null
        })
      ]
    });
  }

  async run(msg, args) {
    if (args.name !== null) {
      msg.client.user.setGame(args.name.substring(0, 128));
    } else { 
      msg.client.user.setGame(null);
    }
  }
}

module.exports = new Setgame();
