const patron = require('patron.js');
const prefix = require('../credentials.json').prefix;
const util = require('../utility');

class CommandService {
  constructor(client, registry) {
    this.client = client;
    this.handler = new patron.Handler(registry);
  }

  async run() {
    this.client.on('message', async (msg) => {
      if (msg.author.id !== msg.client.user.id) {
        return;
      } else if (msg.content.startsWith(prefix)) {
        msg.delete();
      } else {
        return;
      }

      const result = await this.handler.run(msg, prefix);

      if (!result.isSuccess) {
        let message;

        switch (result.commandError) {
          case patron.CommandError.CommandNotFound:
            return util.Messenger.send(msg.channel, msg.content.slice(prefix.length));
          case patron.CommandError.Exception:
            if (result.error.code !== undefined) {
              if (result.error.code === 400) { 
                message = 'There seems to have been a bad request. Please report this issue with msg to PapaJohn#7777.';
              } else if (result.error.code === 404 || result.error.code === 50013) {
                message = 'You do not have permission to do that.';
              } else if (result.error.code === 50007) {
                message = 'You do not have permission to send messages to this user.';
              } else if (result.error.code >= 500 && result.error.code < 600) {
                message = 'Looks like Discord fucked up. An error has occured on Discord\'s part which is entirely unrelated with Papa John\'s Bot.';
              } else {
                message = result.error.message;
              }
            } else {
              message = result.error.message;
              console.error(result.error);
            }
            break;
          case patron.CommandError.InvalidArgCount:
            message = 'You are incorrectly using this command.\n\n**Usage:** `' + prefix + result.command.getUsage() + '`\n\n**Example:** `' + prefix + result.command.getExample() + '`';
            break;
          default:
            message = result.errorReason;
            break;
        }

        return util.Messenger.sendError(msg.channel, message);
      }
    });
  }
}

module.exports = CommandService;
