const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class CommandCount extends patron.Command {
  constructor() {
    super({
      name: 'commandcount',
      aliases: ['cc', 'totalcommands'],
      group: 'developer',
      description: 'See how many commands have been added so far',
      guildOnly: false
    });
  }

  async run(msg) {
    let commandCount = 0;
    let groupCount = 0;
    let m = '__**Command Counts for Modules**__\n';

    const sortedGroups = msg.client.registry.groups.sort(util.StringUtil.alphabeticallySort).values();

    for (const group of sortedGroups) {
      const formattedGroupName = util.StringUtil.upperFirstChar(group.name);
      m += '`' + formattedGroupName + '` - ';

      for (const command of group.commands.sort(util.StringUtil.alphabeticallySort).values()) {
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
