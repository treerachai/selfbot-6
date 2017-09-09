const patron = require('patron.js');

class EscapePod extends patron.Command {
  constructor() {
    super({
      names: ['escapepod', 'ep', 'voicekick'],
      groupName: 'moderation',
      description: 'Kick a user out of voice via escape pod',
      guildOnly: true,
      botPermissions: ['MOVE_MEMBERS', 'MANAGE_CHANNELS'],
      args: [
        new patron.Argument({
          name: 'members',
          key: 'members',
          type: 'member',
          example: '"PeePee Juanathog#7643" PapaJohn#7777',
          infinite: true,
          defaultValue: patron.ArgumentDefault.Member
        })
      ]
    });
  }

  async run(msg, args) {
    const channel = await msg.guild.createChannel('Escape Pod', 'voice');
    for (let i = 0; i < args.members.length; i++) {
      if (args.members[i].voiceChannel !== null) {
        await args.members[i].setVoiceChannel(channel);
      }
    }
    return channel.delete();
  }
}

module.exports = new EscapePod();
