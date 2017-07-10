const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Ping extends patron.Command {
  constructor() {
    super({
      name: 'ping',
      group: 'utility',
      description: 'See your ping',
      guildOnly: false
    });
  }

  async run(msg) { 
      return util.Messenger.send(msg.channel, 'Ping: ' + msg.client.ping.toFixed(0) + ' ms');
  }
}

module.exports = new Ping();
