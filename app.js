const Discord = require('discord.js');
const util = require('util');
const client = new Discord.Client();
const credentials = require('./credentials.json');
const data = require('./data.json');

client.on('disconnect', () => console.log('=====================\nDisconnected'));

client.on('reconnect', () => console.log('=====================\nReconnecting...'));

client.on('ready', () => console.log('=====================\nSuccesfully Connected\n  :Logged Commands:\n====================='));

client.on('message', msg => {
  if (!msg) return;
  if (msg.author.id !== client.user.id) return;
  if (!msg.content.startsWith(credentials.prefix)) return;

  msg.delete()
  .catch(() => null);

  const content = msg.content.slice(credentials.prefix.length);
  const contentArray = content.split(' ');
  const command = contentArray[0].toLowerCase();
  const args = contentArray.slice(1);
  const singlearg = msg.content.slice(credentials.prefix.length+contentArray[0].length+1)

  let guildMember;
  if (msg.guild) guildMember = msg.guild.member(msg.author);

  switch (command) {
	case 'help': case 'git': case 'github':
	  const hembed = new Discord.RichEmbed()
	  .addField('Link to repo for this fork','https://github.com/VapidSlay/SelfBot')
	  .setColor(rand(data.embedColors));
	  msg.sendEmbed(hembed);
	  break;
	case 'ping':
      msg.send('Ping: ' + client.ping.toFixed(2) + ' ms');
