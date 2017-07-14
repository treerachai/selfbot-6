const fs = require('fs');
const path = require('path');
const assert = require('assert');
const credentials = require('../credentials.json');
const util = require('../utility');

class Documentation {
  async createAndSave(registry) {
    let commandsDocumentation = 'All commands are catagorized by groups. Each of the following sections is a group.\n\nThe syntax of the command usage is:\n\n`Optional paramater: []`\n\n`Required paramater: <>`\n\n##Table Of Contents\n';

    let tableOfContents = '';
    let commandInfo = '';

    const sortedGroups = Array.from(registry.groups.values()).sort(util.StringUtil.alphabeticallySort);

    for (const group of sortedGroups) {
      const formattedGroupName = util.StringUtil.upperFirstChar(group.name);

      tableOfContents += '- [' + formattedGroupName + '](#' + group.name.toLowerCase() + ')\n';

      commandInfo += '\n### '+ formattedGroupName +'\n';

      if (!util.StringUtil.isNullOrWhiteSpace(group.description)) {
        commandInfo += '\n' + group.description + '\n\n';
      }

      commandInfo += 'Command | Description | Usage\n---------------- | --------------| -------\n';

      for (const command of Array.from(group.commands.values()).sort(util.StringUtil.alphabeticallySort)) {
        commandInfo += util.StringUtil.upperFirstChar(command.name) + '|' + command.description + '|`' + credentials.prefix + command.getUsage() + '`\n';
      }
    }

    commandsDocumentation += tableOfContents + commandInfo;

    fs.writeFile(path.join(__dirname, '../../docs/docs/commands.md'), commandsDocumentation, (err) => {
      assert.equal(err, null);
    });
  }
}

module.exports = new Documentation();

