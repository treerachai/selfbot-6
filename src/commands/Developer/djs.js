const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Djs extends patron.Command {
  constructor() {
    super({
      name: 'djs',
      aliases: ['discordjs', 'discord.js', 'd.js'],
      group: 'developer',
      description: 'Get a link to the documentation of the Discord.js version this Selfbot uses',
      guildOnly: false
    });
  }

  async run(msg) {
    return util.Messenger.send(msg.channel, 'https://discord.js.org/#/docs/main/stable/general/welcome',
      'This Selfbot uses Discord.js version: ' + Discord.version);
  }
}

module.exports = new Djs();
