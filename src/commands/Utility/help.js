const patron = require('patron.js');
const util = require('../../utility');
const credentials = require('../../credentials.json');

class Help extends patron.Command {
  constructor() {
    super({
      name: 'help',
      aliases: ['info', 'information', 'commands'],
      group: 'utility',
      description: 'View command information',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'command',
          key: 'command',
          type: 'string',
          example: 'lenny',
          defaultValue: ''
        })
      ]
    });
  }

  async run(msg, args) {
    if (util.StringUtil.isNullOrWhiteSpace(args.command)) {
      return util.Messenger.send(msg.channel, 'A full list of commands can be found here: https://vapidslay.github.io/selfbot/commands/' +
      '\n\nUse `' + credentials.prefix + 'help [command name]` to view information about any command!');
    }
    args.command = args.command.startsWith(credentials.prefix) ? args.command.slice(credentials.prefix.length) : args.command;

    const lowerInput = args.command.toLowerCase();

    let command = msg.client.registry.commands.get(lowerInput);

    if (command === undefined) {
      const matches = msg.client.registry.commands.filterArray((value) => value.aliases.some((v) => v === lowerInput));

      if (matches.length > 0) {
        command = matches[0];
      } else {
        return util.Messenger.sendError(msg.channel, 'There is no command titled: `' + lowerInput + '`', 'Command not found.');
      }
    }

    return util.Messenger.send(msg.channel, '**Description:** `' + command.description + '`\n**Usage:** `' + credentials.prefix + command.getUsage() + '`\n**Example:** `' +
      credentials.prefix + command.getExample() + '`', util.StringUtil.upperFirstChar(command.name));

  }
}

module.exports = new Help();
