const patron = require('patron.js');
const util = require('../../utility');

class CommandCount extends patron.Command {
  constructor() {
    super({
      names: ['commandcount', 'cc', 'totalcommands'],
      groupName: 'developer',
      description: 'See how many commands have been added so far',
      guildOnly: false
    });
  }

  async run(msg) {
    let commandCount = 0;
    let groupCount = 0;
    let m = '';

    const sortedGroups = msg.client.registry.groups.sort(util.StringUtil.alphabeticallySort).values();

    for (const group of sortedGroups) {
      const formattedGroupName = util.StringUtil.upperFirstChar(group.name);
      m += '`' + formattedGroupName + '` - ';

      for (let i = 0; i < group.commands.array().length; i++) {
        commandCount++;
        groupCount++;
      }

      m += groupCount + '\n';
      groupCount = 0;
    }

    return util.Messenger.send(msg.channel, m, 'Total Command Count: ' + commandCount);
  }
}

module.exports = new CommandCount();
