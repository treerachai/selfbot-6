const patron = require('patron.js');
const util = require('../../utility');

class BanAll extends patron.Command {
  constructor() {
    super({
      name: 'banall',
      group: 'utility',
      description: 'Ban all users in a role from a specific guild.',
      botPermissions: ['BAN_MEMBERS'],
      args: [
        new patron.Argument({
          name: 'guild',
          key: 'guild',
          type: 'guild',
          example: '"Discord API"'
        }),
        new patron.Argument({
          name: 'role name',
          key: 'roleName',
          type: 'string',
          example: 'Moderators',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const lowerInput = args.roleName.toLowerCase();
    const role = args.guild.roles.find((v) => v.name.toLowerCase().includes(lowerInput));

    if (role === null) {
      return util.Messenger.sendError(msg.channel, 'Role not found.');
    }

    let banned = '';

    for (const member of role.members.values()) {
      await msg.guild.ban(member.user);

      banned += member.user.tag + ', ';
    }

    return msg.channel.send('You have successfully banned ' + banned.slice(0, -2) + '.', { split: { char: ' ' } });
  }
}

module.exports = new BanAll();
