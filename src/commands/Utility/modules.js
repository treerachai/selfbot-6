const patron = require('patron.js');
const util = require('../../utility');

class Modules extends patron.Command {
  constructor() {
    super({
      name: 'modules',
      aliases: ['module', 'groups', 'group'],
      group: 'utility',
      description: 'View the current command modules',
      guildOnly: false
    });
  }

  async run(msg) {
    const groups = msg.client.registry.groups.sort(util.StringUtil.alphabeticallySort).values();
    let m = '';
    for (const group of groups) {
      m += '`' + util.StringUtil.upperFirstChar(group.name) + '`, ';
    }
    m = m.substring(0, m.length - 2);

    return util.Messenger.send(msg.channel, m, 'Current Command Modules');
  }
}

module.exports = new Modules();
