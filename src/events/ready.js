module.exports = (client) => {
  client.on('ready', async () => {
    const d = new Date();
    console.log(d.getHours() + ':' + d.getMinutes() + ' - Papa John\'s Selfbot has successfully connected.\n        \\/ Logged Commands \\/');
  });
};
