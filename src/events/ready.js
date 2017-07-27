const colors = require('colors');
module.exports = (client) => {
  client.on('ready', async () => {
    const d = new Date();
    const time = d.getHours() + ':' + d.getMinutes();
    const connectMsg = ' - Papa John\'s Selfbot has successfully connected.';
    const logMsg = '\n        \\/ Logged Commands \\/';
    console.log(time.green + connectMsg.green + logMsg.rainbow);
  });
};
