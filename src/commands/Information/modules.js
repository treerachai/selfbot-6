const patron = require('patron.js');
const util = require('../../utility');

class Modules extends patron.Command {
  constructor() {
    super({
      names: ['modules', 'module', 'groups', 'group'],
      groupName: 'information',
      description: 'View the current command modules',
      guildOnly: false
    });
  }

  async run(msg) {
    const groupNames = msg.client.registry.groups.sort(util.StringUtil.alphabeticallySort).map((group) => {
      return util.StringUtil.upperFirstChar(group.name);
    });
    const m = util.StringUtil.inLineList(groupNames);

    return util.Messenger.send(msg.channel, m, 'Current Command Modules');
  }
}

module.exports = new Modules();
