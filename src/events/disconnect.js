module.exports = (client) => {
  client.on('reconnect', () => {
    console.log('Papa John\'s Selfbot has disconnected.');
  });
};
