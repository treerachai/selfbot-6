const patron = require('patron.js');
const util = require('../../utility');
const credentials = require('../../credentials.json');
const Discord = require('discord.js');

class Help extends patron.Command {
  constructor() {
    super({
      names: ['help', 'info', 'commands'],
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
    const groupCmdNames = group.commands.sort((a, b) => a.names[0].localeCompare(b.names[0])).map((command) => {
      return command.names[0];
    });
    const groupMsg = util.StringUtil.inLineList(groupCmdNames);
    const embed = new Discord.RichEmbed()
      .setTitle(util.StringUtil.upperFirstChar(group.name) + ' Module\'s Commands')
      .setDescription(groupMsg)
      .setFooter(group.description);
    return util.Messenger.sendEmbed(msg.channel, embed);

  }
}

module.exports = new Help();
