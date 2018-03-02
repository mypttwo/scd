'use strict'

const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
const HDWalletProvider = require("truffle-hdwallet-provider");
const {infura_url_apikey, mnemonic, contract_path_and_filename, contract_name, contract_args} = require('./setup');

let web3 = new Web3(
    new HDWalletProvider(mnemonic, infura_url_apikey)
);

web3.eth.getAccounts().then((accountArray) => {
    let code = fs.readFileSync(contract_path_and_filename).toString();
    let compiledCode = solc.compile(code);
    let abiDefinition = JSON.parse(compiledCode.contracts[`:${contract_name}`].interface);
    let byteCode = compiledCode.contracts[':Voting'].bytecode;
    let defaultAccount = accountArray[0];
    console.log(`Default Account : ${defaultAccount}`);
    web3.eth.estimateGas({data: '0x' + byteCode}).then((gasEstimate) => {
        console.log(`Gas Estimate : ${gasEstimate}`);
        deployContract(defaultAccount, gasEstimate, abiDefinition, byteCode);
    });
});

function deployContract(defaultAccount, gasEstimate, abiDefinition, byteCode){
    let VotingContract = new web3.eth.Contract(abiDefinition);

    VotingContract.deploy({
        data: '0x' + byteCode, 
        arguments: [contract_args]
    }).send({
        from: defaultAccount, 
        gas: web3.utils.toHex(gasEstimate + 500000)
    }).then((result) => {
        console.log('Deployed Contract : ' + result);
        let deployedContract = result;
    }).catch((error) => {
        console.log(`Deployment Error : ${error}`);
    });
}


