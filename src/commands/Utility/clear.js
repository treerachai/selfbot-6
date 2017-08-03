const patron = require('patron.js');
const util = require('../../utility');

class Clear extends patron.Command {
  constructor() {
    super({
      name: 'clear',
      aliases: ['clearconsole', 'hide', 'hideconsole'],
      group: 'utility',
      description: 'Clears the console',
      guildOnly: false
    });
  }

  async run(msg) {
    process.stdout.write('\x1B[2J\x1B[0f');
    console.log('Console Logs Successfully Cleared'.green);
    const m = await util.Messenger.send(msg.channel, 'Console Cleared');
    m.delete(5000);
  }
}

module.exports = new Clear();
