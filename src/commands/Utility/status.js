const patron = require('patron.js');
const MustBe = require('../../preconditions/mustBe.js');

class Status extends patron.Command {
  constructor() {
    super({
      names: ['status', 'setstatus', 'afk'],
      groupName: 'utility',
      description: 'Changes your status',
      args: [
        new patron.Argument({
          name: 'status',
          key: 'status',
          type: 'string',
          example: 'invisible',
          preconditions: [new MustBe(['online', 'idle', 'dnd', 'invisible'])]
        })
      ]
    });
  }

  async run(msg, args) {
    return msg.client.user.setStatus(args.status);
  }
}

module.exports = new Status();
