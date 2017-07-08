class EventService {
  constructor(client) {
    this.client = client;
  }

  initiate() {
    require('../events/disconnect.js')(this.client);
    require('../events/error.js')(this.client);
    require('../events/ready.js')(this.client);
    require('../events/reconnect.js')(this.client);
    require('../events/warn.js')(this.client);
  }
}

module.exports = EventService;
