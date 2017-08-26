const patron = require('patron.js');
const SafeMode = require('../../preconditions/safeMode.js');

class RemovePlus extends patron.Command {
  constructor() {
    super({
      names: ['removeplus', 'rp', 'rplus', 'r+'],
      groupName: 'messager',
      description: 'Sends <message> then deletes it',
      guildOnly: false,
      preconditions: [SafeMode],
      args: [
        new patron.Argument({
          name: 'message',
          key: 'message',
          type: 'string',
          example: 'No way hoe zay',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const m = await msg.channel.send(args.message);
    m.delete();
  }
}

module.exports = new RemovePlus();
