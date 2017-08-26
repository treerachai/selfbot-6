const patron = require('patron.js');
const util = require('../../utility');
const utility = require('util');
const SafeMode = require('../../preconditions/safeMode.js');

class Calc extends patron.Command {
  constructor() {
    super({
      names: ['calc', 'calculate', 'calculator'],
      groupName: 'utility',
      description: 'Do basic adding, subtracting, multiplying, and dividing',
      guildOnly: false,
      preconditions: [SafeMode],
      args: [
        new patron.Argument({
          name: 'problem',
          key: 'input',
          type: 'string',
          example: '3*(2+3)/4-2e2',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const code = args.input.replace(/[^0-9+\-*/().e]/gi, '');
    if (code === null) {
      return util.Messenger.sendError(msg.channel, 'You must provide something valid to calculate');
    }
    try {
      let result = eval(code);

      if (typeof result !== 'string') {
        result = utility.inspect(result, { depth: 0 });
      }

      return util.Messenger.send(msg.channel, '```js\n' + code + ' = ' + result + '```', 'Calculator');
    } catch (err) {
      return util.Messenger.sendError(msg.channel, '```js\n' + err + '```');
    }
  }
}

module.exports = new Calc();
