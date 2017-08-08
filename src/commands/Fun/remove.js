const patron = require('patron.js');

class Remove extends patron.Command {
  constructor() {
    super({
      names: ['remove', 'r'],
      groupName: 'fun',
      description: 'Deletes the command',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'text',
          type: 'string',
          example: 'No way hoe zay',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    //Left blank, the message is deleted by the Command service
  }
}

module.exports = new Remove();
