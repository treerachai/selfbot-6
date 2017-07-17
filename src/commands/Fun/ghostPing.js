const patron = require('patron.js');

class GhostPing extends patron.Command {
  constructor() {
    super({
      name: 'ghostping',
      aliases: ['gp'],
      group: 'fun',
      description: 'Ghost pings all members of a role.',
      args: [
        new patron.Argument({
          name: 'role',
          key: 'role',
          type: 'role',
          example: 'Moderators',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    let message = '';

    for (const member of args.role.members.values()) {
      message += '<@' + member.id + '> ';
    }

    const sent = await msg.channel.send(message);
    sent.delete();
  }
}

module.exports = new GhostPing();
