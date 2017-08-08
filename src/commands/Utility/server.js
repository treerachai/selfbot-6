const patron = require('patron.js');
const util = require('../../utility');

class Server extends patron.Command {
  constructor() {
    super({
      names: ['server'],
      groupName: 'utility',
      description: 'Sends an invite to this Selfbot\'s server',
      guildOnly: false
    });
  }

  async run(msg) {
    return util.Messenger.send(msg.channel, '[Click Here to Join this Selfbot\'s official server](https://discord.gg/zz9KTka)');
  }
}

module.exports = new Server();
