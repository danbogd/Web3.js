$("#button2").click(function() {

var web3 = new Web3('https://rinkeby.infura.io/metamask')

const abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "OwnershipTransferred",
        "type": "event"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "halt",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_date",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_hesh",
                "type": "string"
            }
        ],
        "name": "SetToBase",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "unHalt",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_date",
                "type": "uint256"
            }
        ],
        "name": "GetHash",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "halted",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "hashBase",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];

const contractAddress = '0xA7952c5097BA08891C2Dd963050C7B2465355AB1'
const contract = new web3.eth.Contract(abi, contractAddress)
const account1 = '0x65D069D418E7d56bFc2C1d6D78c5dAd8A32D1882' // Your account address 


console.log('typeof ethereumjs:',               (typeof ethereumjs))
console.log('Object.keys(ethereumjs):',         Object.keys(ethereumjs))
console.log('typeof ethereumjs.Tx:',            (typeof ethereumjs.Tx))
console.log('typeof ethereumjs.RLP:',           (typeof ethereumjs.RLP))
console.log('typeof ethereumjs.Util:',          (typeof ethereumjs.Util))
console.log('typeof ethereumjs.Buffer:',        (typeof ethereumjs.Buffer))
console.log('typeof ethereumjs.Buffer.Buffer:', (typeof ethereumjs.Buffer.Buffer))

//TODO убрать ключи!!!
  let privateKey = new ethereumjs.Buffer.Buffer('', 'hex')
  
web3.eth.getTransactionCount(account1, (err, txCount) => {

  let txParams = {
    nonce: web3.utils.toHex(txCount),
    gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')), 
    gasLimit: web3.utils.toHex(800000),
    to:       contractAddress, 
    //value:    '0x00', 
    data:     contract.methods.SetToBase($("#time").val(), $("#hash").val()).encodeABI()  
  }
  
  let tx = new ethereumjs.Tx(txParams)
  tx.sign(privateKey)
  
  let serializedTx = tx.serialize();
  const raw = '0x' + serializedTx.toString('hex');


  
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('err:', err, 'txHash:', txHash)
  // Use this txHash to find the contract on Etherscan!
  })
})

});