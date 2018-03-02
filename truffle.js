'use strict'

let HDWalletProvider = require("truffle-hdwallet-provider");
const {infura_url_apikey, mnemonic} = require('./setup');

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    remote: {
      provider: new HDWalletProvider(mnemonic, infura_url_apikey),
      network_id: 3
    }
  }
};