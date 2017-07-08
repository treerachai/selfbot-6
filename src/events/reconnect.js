module.exports = (client) => {
  client.on('reconnect', () => {
    console.log('Attempting to reconnect...');
  });
};
