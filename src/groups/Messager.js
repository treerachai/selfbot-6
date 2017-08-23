const patron = require('patron.js');

class Messager extends patron.Group {
  constructor() {
    super({
      name: 'messager',
      description: 'These commands allow you to send your messages in unique ways' });
  }
}

module.exports = new Messager();
