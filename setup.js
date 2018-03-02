'use strict'

require('dotenv').config();
const Web3 = require('web3');
const asciiToHex = Web3.utils.asciiToHex;

let infura_url_apikey = process.env.INFURA_URL_API_KEY;
let mnemonic = process.env.MNEMONIC;

let contract_path_and_filename = './contracts/Voting.sol';
let contract_name = 'Voting';
let contract_args = ['Rama', 'Nick', 'Jose'].map(asciiToHex);

module.exports = {
    infura_url_apikey,
    mnemonic,
    contract_path_and_filename,
    contract_name,
    contract_args
}

