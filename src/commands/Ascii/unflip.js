const patron = require('patron.js');

class Unflip extends patron.Command {
  constructor() {
    super({
      names: ['unflip', 'uf'],
      groupName: 'ascii',
      description: 'Adds " ┬─┬﻿ ノ( ゜-゜ノ)" to your message',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'text',
          type: 'string',
          example: 'But they gave me some coupons',
          remainder: true,
          defaultValue: ''
        })
      ]
    });
  }

  async run(msg, args) {
    return msg.channel.send(args.text + ' ┬─┬﻿ ノ( ゜-゜ノ)');
  }
}

module.exports = new Unflip();
