const patron = require('patron.js');

class RoleIds extends patron.Command {
  constructor() {
    super({
      name: 'roleids',
      group: 'developer',
      description: 'Gets all the role ids of a guild.'
    });
  }

  async run(msg) {
    let content = '';

    for (const role of msg.guild.roles.values()) {
      if (role.id === msg.guild.defaultRole.id) {
        continue;
      }

      content += role.name + ':' + role.id + '\n';
    }

    return msg.channel.send(content, { split: true });
  }
}

module.exports = new RoleIds();
