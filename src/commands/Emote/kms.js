const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class Kms extends patron.Command {
  constructor() {
    super({
      name: 'kms',
      aliases: ['suicide'],
      group: 'emote',
      description: 'Kill yourself in a 3 frame animation',
      guildOnly: false
    });
  }

  async run(msg) {
    msg.channel.send(':joy: :gun:').then(async m => {
      setTimeout(function() {m.edit(':boom: :gun:').catch(Error).then(async m => {
        setTimeout(function() {
          m.edit(':skull: :gun:').catch(Error);
        }, 1000);
      });
    }, 3000);
    });
  return;
  }
}

module.exports = new Kms();
