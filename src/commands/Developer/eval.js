/* eslint-disable no-unused-vars */
const patron = require('patron.js');
const util = require('../../utility');
const utility = require('util');
const Discord = require('discord.js');

class Eval extends patron.Command {
  constructor() {
    super({
      names: ['eval'],
      groupName: 'developer',
      description: 'Evaluate JavaScript code',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'code',
          key: 'code',
          type: 'string',
          example: 'msg.author.tag',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    try {
      const client = msg.client;
      const message = msg;
      const guild = msg.guild;
      const channel = msg.channel;
      const author = msg.author;
      const member = msg.member;

      let result = eval(args.code);

      if (result instanceof Promise) {
        result = await result;
      }

      if (typeof result !== 'string') {
        result = utility.inspect(result, { depth: 0 });
      }

      result = result.replace(msg.client.token, ' ').replace(/\[Object\]/g, 'Object').replace(/\[Array\]/g, 'Array');

      return util.Messenger.sendFields(msg.channel, ['Eval', '```js\n' + args.code + '```', 'Returns', '```js\n' + result + '```'], false);
    } catch (err) {
      return util.Messenger.sendError(msg.channel, '```js\n' + err + '```');
    }
  }
}

module.exports = new Eval();
