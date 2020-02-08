

$("#button2").click(function() {

//setTimeout("alert('Boom!');", 10000);

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
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "date",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "hash",
        "type": "string"
      }
    ],
    "name": "Write",
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
    "constant": false,
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_date",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_hash",
        "type": "string"
      }
    ],
    "name": "WriteToBase",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "counter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "GetCounter",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
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
    
    

const contractAddress = '0x9B8B3768294f74e2F41DCd4d6a92815E450a4C78'
const contract = new web3.eth.Contract(abi, contractAddress)
const account1 = '0xa86051704B7346c017DdE487cFDcF42968C96Ebf' // Your account address 


console.log('typeof ethereumjs:',               (typeof ethereumjs))
console.log('Object.keys(ethereumjs):',         Object.keys(ethereumjs))
console.log('typeof ethereumjs.Tx:',            (typeof ethereumjs.Tx))
console.log('typeof ethereumjs.RLP:',           (typeof ethereumjs.RLP))
console.log('typeof ethereumjs.Util:',          (typeof ethereumjs.Util))
console.log('typeof ethereumjs.Buffer:',        (typeof ethereumjs.Buffer))
console.log('typeof ethereumjs.Buffer.Buffer:', (typeof ethereumjs.Buffer.Buffer))

//TODO убрать ключи!!!
  let privateKey = new ethereumjs.Buffer.Buffer('305d2ef40b5105f0324025d8b78eb9c803d4167cdbbacdf966f1c730b373401e', 'hex')


  
web3.eth.getTransactionCount(account1, (err, txCount) => {

  let txParams = {
    nonce: web3.utils.toHex(txCount),
    gasPrice: web3.utils.toHex(web3.utils.toWei('20', 'gwei')), 
    gasLimit: web3.utils.toHex(800000),
    to:       contractAddress, 
    //value:    '0x00', 
    data:     contract.methods.WriteToBase($("#time").val(), $("#hash").val()).encodeABI()  
  }
  
  let tx = new ethereumjs.Tx(txParams)
  tx.sign(privateKey)
  
  let serializedTx = tx.serialize();
  const raw = '0x' + serializedTx.toString('hex');


  
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log('err:', err, 'txHash:', txHash);
    
    
    document.getElementById('tid').textContent = txHash;
  // Use this txHash to find the contract on Etherscan!
  })
  })





});






$("#button3").click(function() {

var web3 = new Web3('https://rinkeby.infura.io/metamask')

const abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"date","type":"uint256"},{"indexed":false,"internalType":"string","name":"hash","type":"string"}],"name":"Write","type":"event"},{"constant":true,"inputs":[{"internalType":"uint256","name":"_date","type":"uint256"}],"name":"GetHash","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_date","type":"uint256"},{"internalType":"string","name":"_hash","type":"string"}],"name":"WriteToBase","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"halt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"halted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"hashBase","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"unHalt","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
    
    

const contractAddress = '0xE243E85724Cb87db2Ad233124d5B6F7a87764090'
const contract = new web3.eth.Contract(abi, contractAddress)
 

contract.getPastEvents('Write', {
    filter: {myIndexedParam: [20,23], myOtherIndexedParam: '0x123456789...'}, // Using an array means OR: e.g. 20 or 23
    fromBlock: 0,
    toBlock: 'latest'
}, function(error, events){  })
.then(function(events){
    console.log(events.length); // same results as the optional callback above
document.getElementById('writeCount').textContent = events.length;    
});




});    





