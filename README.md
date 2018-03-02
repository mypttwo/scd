# Simple Smart Contract Deployer

Deploy Ethreum smart contracts without running a local geth node using [web3 1.0.0](https://web3js.readthedocs.io/en/1.0/) and [nodejs](https://nodejs.org/en/).

You will find this interesting if
 - you need a working example using [web3 1.0.0](https://web3js.readthedocs.io/en/1.0/). As of this doc checkin there is plenty of code on the web using [web3 0.x.x](https://github.com/ethereum/wiki/wiki/JavaScript-API) but I couldn't find a complete working example using web3 1.0.0. (Maybe I didn't look hard enough!)
 - you do not want to run a local node - either to connect to [Ropsten](https://ropsten.etherscan.io/)/[Rinkeby](https://rinkeby.etherscan.io/) or even [testrpc/ganache](http://truffleframework.com/ganache/) .   

Disclaimers :  

 1. This is not production code and is not secure. It also does not follow best practices for nodejs app development. This is simply an example - deliberately stripped down for clarity. 
 2. The simpler way to deploy the contract is to use [truffle console](#using-truffle-console) of course. This only demonstrates a way it can be done via nodejs. 

## Getting Started

Apart from having nodejs installed and other usual stuff you will need to 
 - Signup on [infura.io](https://infura.io/). This is the infrastructure that powers [Metamask](https://metamask.io/). You should have an **API key** at the end of the signup.
 - Install [Metamask](https://metamask.io/) if you have not done that as yet. This will give you a **default account and a [mnemonic](https://en.bitcoin.it/wiki/Mnemonic_phrase)** to login. 
 - Get some **ether** to begin with.  You would also like to work with a *test* network like [Ropsten](https://ropsten.etherscan.io/) or [Rinkeby](https://rinkeby.etherscan.io/). Look for faucets in the respective networks - like [Ropsten faucet](http://faucet.ropsten.be:3001/), [Rinkeby faucet](https://faucet.rinkeby.io/).

## Running the code

 - The code includes a **.env** file. You will need to set the appropriate variables like so.

    ``INFURA_URL_API_KEY=https://ropsten.infura.io/1t7lIne9gTwmPs9Twsd5``
    ``MNEMONIC=one two three four five six seven eight nine ten eleven twelve``

*Needless to say the above file should never be checked in or even logged. If you do that in production you will be robbed.*

 - The code includes a **setup.js** where you can specify 
	 - the path and name of the .sol file containing the Contract.
	 - the name of the Contract itself
	 - the arguments for the Contract

The code uses the [Voting Contract](https://gist.github.com/maheshmurthy/3da385a42678c3e36a8328cbe47cae5b#file-voting-sol) by [Mahesh Murthy](https://medium.com/@mvmurthy) as an example. 

 - Finally you run the code like so
>  ``node app.js``

## Output

The example simply 
 - connects to the infura endpoint with the mnemonic as credentials
 - gets the first account you see on Metamask (only the first is returned anyway even if multiple accounts are available)
 - dynamically compiles the Contract and extracts the [abi](https://solidity.readthedocs.io/en/develop/abi-spec.html) and the bytecode
 - estimates the [gas](https://media.consensys.net/ethereum-gas-fuel-and-fees-3333e17fe1dc) required for deploying the Contract (this is not accurate; we add some more gas later as you would see in the code)
 - and finally deploys the Contract.

Its also possible that an error may result even if all works well. 

> ``Error: Transaction was not mined within 50 blocks, please make sure your transaction was properly sent. Be aware that it might still be mined!``

 You can view the results on [etherscan](https://etherscan.io/) via Metamask.

## Using truffle console

In case you want to connect via truffle console you will need to run

> ``truffle console --network remote``

## Acknowledgements

 - Excellent [tutorials](https://github.com/maheshmurthy/ethereum_voting_dapp) by [Mahesh Murthy](https://medium.com/@mvmurthy)  

