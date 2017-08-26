const patron = require('patron.js');
const util = require('../../utility');

class Setgame extends patron.Command {
  constructor() {
    super({
      names: ['setgame', 'sg'],
      groupName: 'utility',
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
    if (!util.StringUtil.isNullOrWhiteSpace(args.name)) {
      msg.client.user.setPresence({ game: { name: args.name.substring(0, 128), type: 0 } });
    } else {
      msg.client.user.setGame(null);
    }
  }
}

module.exports = new Setgame();
