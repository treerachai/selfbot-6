const patron = require('patron.js');
const util = require('../../utility');

class Kms extends patron.Command {
  constructor() {
    super({
      names: ['kms', 'suicide'],
      groupName: 'emoji',
      description: 'Kill yourself in a 3 frame animation',
      guildOnly: false
    });
  }

  async run(msg) {
    const m = await msg.channel.send(':joy: :gun:');
    await util.PromiseUtil.delay(3000);
    await m.edit(':boom: :gun:');
    await util.PromiseUtil.delay(1000);
    await m.edit(':skull: :gun:');
  }
}

module.exports = new Kms();
