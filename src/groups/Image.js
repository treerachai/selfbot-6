const patron = require('patron.js');
const ImageGroup = require('../preconditions/imageGroup.js');

class Image extends patron.Group {
  constructor() {
    super({
      name: 'image',
      description: 'These commands are for when text just doesn\'t quite capture how you feel',
      preconditions: [ImageGroup]
    });
  }
}

module.exports = new Image();
