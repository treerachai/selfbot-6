const patron = require('patron.js');
const util = require('../../utility');

class Alias extends patron.Command {
  constructor() {
    super({
      name: 'alias',
      aliases: ['aliases'],
      group: 'utility',
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
    let m = '';
    let cmd = msg.client.registry.commands.get(lowerInput);

    if (cmd === undefined) {
      const matches = msg.client.registry.commands.filterArray((value) => value.aliases.some((v) => v === lowerInput));
      if (matches.length === 0) {
        return util.Messenger.sendError(msg.channel, 'Command not found');
      }
      cmd = matches[0];
    }

    let aliases = cmd.aliases;

    if (aliases.length === 0) {
      return util.Messenger.sendTitle(msg.channel, util.StringUtil.upperFirstChar(cmd.name) + ' has no aliases');
    }

    aliases = aliases.sort();
    for (const alias of aliases) {
      m += '`' + alias + '`, ';
    }
    m = m.substring(0, m.length - 2);

    return util.Messenger.send(msg.channel, m, util.StringUtil.upperFirstChar(cmd.name) + '\'s Aliases');
  }
}

module.exports = new Alias();
