const patron = require('patron.js');
const util = require('../../utility');

class Alias extends patron.Command {
  constructor() {
    super({
      names: ['alias', 'aliases'],
      groupName: 'information',
      description: 'View a command\'s aliases',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'command',
          key: 'cmd',
          type: 'string',
          example: 'lenny'
        })
      ]
    });
  }

  async run(msg, args) {
    const lowerInput = args.cmd.toLowerCase();
    const cmd = msg.client.registry.commands.find((x) => x.names.some((y) => y === lowerInput));

    if (cmd === undefined) {
      return util.Messenger.sendError(msg.channel, 'Command not found');
    }

    const aliases = cmd.names.slice(1, cmd.names.length);

    if (aliases.length === 0) {
      return util.Messenger.sendTitle(msg.channel, util.StringUtil.upperFirstChar(cmd.names[0]) + ' has no aliases');
    }

    const m = util.StringUtil.inLineList(aliases.sort());

    return util.Messenger.send(msg.channel, m, util.StringUtil.upperFirstChar(cmd.names[0]) + '\'s Aliases');
  }
}

module.exports = new Alias();
