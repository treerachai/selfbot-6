const patron = require('patron.js');

class SetAvatar extends patron.Command {
  constructor() {
    super({
      name: 'setavatar',
      aliases: ['sa'],
      group: 'fun',
      description: 'Changes your avatar to the image provided',
      args: [
        new patron.Argument({
          name: 'pathToImageOrLink',
          key: 'image',
          type: 'string',
          remainder: true,
          example: 'http://i0.kym-cdn.com/photos/images/original/001/235/521/601.png'
        })
      ]
    });
  }

  async run(msg, args) {
    return msg.author.setAvatar(args.image).catch(console.error);
  }
}

module.exports = new SetAvatar();
