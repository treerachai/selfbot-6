const patron = require('patron.js');
const util = require('../../utility');
const credentials = require('../../credentials.json');

class Help extends patron.Command {
  constructor() {
    super({
      names: ['help', 'info', 'information', 'commands'],
      groupName: 'utility',
      description: 'View command information or list the commands in a module',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'command/module',
          key: 'input',
          type: 'string',
          example: 'lenny',
          defaultValue: ''
        })
      ]
    });
  }

  async run(msg, args) {
    if (util.StringUtil.isNullOrWhiteSpace(args.input)) {
      return util.Messenger.send(msg.channel, 'A full list of commands can be found here: https://vapidslay.github.io/selfbot/commands/' +
      '\n\nUse `' + credentials.prefix + 'help [command/module name]` to view it\'s info!');
    }
    args.input = args.input.startsWith(credentials.prefix) ? args.input.slice(credentials.prefix.length) : args.input;

    const lowerInput = args.input.toLowerCase();

    const command = msg.client.registry.commands.find((x) => x.names.some((y) => y === lowerInput));
    let group;

    if (command === undefined) {
      group = msg.client.registry.groups.find((x) => x.name === lowerInput);

      if (group === undefined) {
        return util.Messenger.sendError(msg.channel, 'There is no command or module titled: `' + lowerInput + '`', 'Command/Module not found.');
      }
    }

    if (group === undefined) {
      let cmdMsg = '**Description:** `' + command.description + '`\n**Usage:** `' + credentials.prefix + command.getUsage() + '`\n**Example:** `' + credentials.prefix + command.getExample() + '`';
      if (command.botPermissions.length !== 0) {
        cmdMsg += '\n**Required Permissions:** ';
        for (const perm of command.botPermissions) {
          cmdMsg += '`' + perm + '`, ';
        }
        cmdMsg = cmdMsg.substring(0, cmdMsg.length - 2);
      }

      return util.Messenger.send(msg.channel, cmdMsg, util.StringUtil.upperFirstChar(command.names[0]));

    }
    let groupMsg = '';
    const groupCmds = group.commands.sort((a, b) => a.names[0].localeCompare(b.names[0]));

    for (const cmd of groupCmds) {
      groupMsg += '`' + cmd.names[0] + '`, ';
    }
    groupMsg = groupMsg.substring(0, groupMsg.length - 2);
    return util.Messenger.send(msg.channel, groupMsg, util.StringUtil.upperFirstChar(group.name) + ' Module\'s Commands');

  }
}

module.exports = new Help();
