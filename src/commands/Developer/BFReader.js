const patron = require('patron.js');
const util = require('../../utility');
const Discord = require('discord.js');

class BFReader extends patron.Command {
  constructor() {
    super({
      names: ['bfreader', 'bfr', 'brainfuckreader'],
      groupName: 'developer',
      description: 'Turn BF code into text',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'BF Code',
          key: 'code',
          type: 'string',
          example: '++++++++++[>++++++++++>+++++++++++<<-]>++++.+.',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {
    const input = args.code;
    let m = '';
    let char;
    let charPtr = 0;
    const arr = [];
    let ptr = 0;
    const loopPtrs = [];

    while ((char = input[charPtr]) !== undefined) {
      if (char === '+') {
        arr[ptr] = arr[ptr] ? arr[ptr] + 1 : 1;
      } else if (char === '-') {
        arr[ptr] = arr[ptr] ? arr[ptr] - 1 : - 1;
      } else if (char === '>') {
        ptr++;
      } else if (char === '<') {
        ptr--;
      } else if (char === '[') {
        loopPtrs.push(charPtr);
      } else if (char === ']') {
        if (arr[ptr]) {
          charPtr = loopPtrs[loopPtrs.length - 1];
        } else {
          loopPtrs.pop();
        }
      } else if (char === '.') {
        m += (String.fromCharCode(arr[ptr] ? arr[ptr] : 0));
      }
      charPtr++;
    }

    if (args.code.length < 1010) {
      const embed = new Discord.RichEmbed()
        .addField('BF Code', '```\n' + args.code + '```')
        .addField('Output', '```\n' + m + '```');
      return util.Messenger.sendEmbed(msg.channel, embed);
    }

    return util.Messenger.send(msg.channel, '```\n' + m + '```', 'BF Code Evaluated To:');
  }
}

module.exports = new BFReader();
