const patron = require('patron.js');
const util = require('../../utility');
const credentials = require('../../credentials.json');

class Help extends patron.Command {
  constructor() {
    super({
      name: 'help',
      aliases: ['info', 'information', 'commands'],
      group: 'utility',
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

    let command = msg.client.registry.commands.get(lowerInput);
    let group;

    if (command === undefined) {
      const matches = msg.client.registry.commands.filterArray((value) => value.aliases.some((v) => v === lowerInput));

      if (matches.length > 0) {
        command = matches[0];
      } else {

        group = msg.client.registry.groups.get(lowerInput);

        if (group === undefined) {
          return util.Messenger.sendError(msg.channel, 'There is no command or module titled: `' + lowerInput + '`', 'Command/Module not found.');
        }
      }
    }

    if (group === undefined) {
      return util.Messenger.send(msg.channel, '**Description:** `' + command.description + '`\n**Usage:** `' + credentials.prefix + command.getUsage() + '`\n**Example:** `' +
        credentials.prefix + command.getExample() + '`', util.StringUtil.upperFirstChar(command.name));

    }
    let groupMsg = '';
    const groupCmds = group.commands.sort(util.StringUtil.alphabeticallySort).values();

    for (const cmd of groupCmds) {
      groupMsg += '`' + cmd.name + '`, ';
    }
    groupMsg = groupMsg.substring(0, groupMsg.length - 2);
    return util.Messenger.send(msg.channel, groupMsg, util.StringUtil.upperFirstChar(group.name) + ' Module\'s Commands');

  }
}

module.exports = new Help();
