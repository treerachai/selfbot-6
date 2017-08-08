const patron = require('patron.js');

class Nick extends patron.Command {
  constructor() {
    super({
      names: ['nick', 'nickname', 'setnick', 'setnickname'],
      groupName: 'utility',
      description: 'Changes your nickname in the current guild',
      botPermissions: ['CHANGE_NICKNAME'],
      args: [
        new patron.Argument({
          name: 'nickname',
          key: 'name',
          type: 'string',
          example: 'Papa John',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    msg.guild.member(msg.author).setNickname(args.name);
  }
}

module.exports = new Nick();
