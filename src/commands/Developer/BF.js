const patron = require('patron.js');
const util = require('../../utility');

class BF extends patron.Command {
  constructor() {
    super({
      name: 'bf',
      aliases: ['brainfuck'],
      group: 'developer',
      description: 'Turn text into BF code',
      guildOnly: false,
      args: [
        new patron.Argument({
          name: 'text',
          key: 'text',
          type: 'string',
          example: 'What the durn diddly is this language',
          remainder: true
        })
      ]
    });
  }

  async run(msg, args) {

    const s = util.StringUtil.cleanContent(msg, args.text);
    const uniq = function (a) {
      const result = [];
      for (let i = 0; i < a.length; i++) {
        if (result.indexOf(a[i]) === -1) {
          result.push(a[i]);
        }
      }
      return result;
    };

    let program = '++++++++++';
    const cells = [0].concat(uniq(s.split('').map(e => Math.round(e.charCodeAt() / 10) * 10)));
    program += '[';
    for (let i = 1; i < cells.length; i++) {
      program += '>' + '+'.repeat(cells[i] / 10);
    }
    program += '<'.repeat(cells.length - 1) + '-]';
    let curri = 0,
      corri;
    for (let i = 0; i < s.length; i++) {
      corri = cells.map(v => Math.abs(v - s[i].charCodeAt())).indexOf(Math.min(...cells.map(v => Math.abs(v - s[i].charCodeAt()))));
      program += corri > curri ? '>'.repeat(corri - curri) : curri > corri ? '<'.repeat(curri - corri) : '';
      if (s[i].charCodeAt() > cells[corri]) {
        while (s[i].charCodeAt() > cells[corri]) {
          program += '+';
          cells[corri]++;
        }
      } else if (s[i].charCodeAt() < cells[corri]) {
        while (s[i].charCodeAt() < cells[corri]) {
          program += '-';
          cells[corri]--;
        }
      }
      program += '.';
      curri = corri;
    }

    if (program.length < 2000) {
      return msg.channel.send(program);
    }

    return util.Messenger.sendError(msg.channel, 'Code exceeds 2000 characters');
  }
}

module.exports = new BF();
