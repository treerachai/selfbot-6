const path = require('path');
const patron = require('patron.js');
const discord = require('discord.js');
const EventService = require('./services/EventService.js');
const CommandService = require('./services/CommandService.js');
const Documentation = require('./services/Documentation.js');
const data = require('./data.json');
const credentials = require('./credentials.json');
global.colors = require('colors');

const client = new discord.Client({ messageCacheMaxSize: 5, messageCacheLifetime: 10, messageSweepInterval: 1800, disabledEvents: data.disabledEvents, fetchAllMembers: true });

const registry = new patron.Registry();

registry.registerDefaultTypeReaders();
registry.registerGroupsIn(path.join(__dirname, 'groups'));
registry.registerCommandsIn(path.join(__dirname, 'commands'));

client.registry = Object.freeze(registry);

new EventService(client).initiate();

new CommandService(client, registry).run().catch(console.error);

Documentation.createAndSave(registry);

client.login(credentials.token);
