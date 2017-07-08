const patron = require('patron.js');
const util = require('../../utility');

class Unflip extends patron.Command {
  constructor() {
    super({
      name: 'unflip',
      aliases: ['uf'],
      group: 'emote',
      description: 'Adds " ┬─┬﻿ ノ( ゜-゜ノ)" to your message',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'text',
          type: 'string',
          example: 'But they gave me some coupons',
          isRemainder: true,
          default: ''
        })
      ]
    });
  }

  async run(context, args) {
    return context.channel.send(args.text + ' ┬─┬﻿ ノ( ゜-゜ノ)');
  }
}

module.exports = new Unflip();
