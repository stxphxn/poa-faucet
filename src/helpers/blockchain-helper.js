const Web3 = require('web3');

module.exports = function (app) {
  function configureWeb3(config) {
    return new Promise((resolve, reject) => {
      let web3;
      if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
      } else {
        web3 = new Web3(new Web3.providers.HttpProvider(config.Ethereum[config.environment].rpc));
      }

      if (typeof web3 !== 'undefined') {
        return resolve(web3);
      }

      // eslint-disable-next-line prefer-promise-reject-errors
      return reject({
        code: 500,
        title: 'Error',
        message: 'check RPC',
      });
    });
  }
  // eslint-disable-next-line no-param-reassign
  app.configureWeb3 = configureWeb3;
};
