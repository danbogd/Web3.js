var web3 = new Web3('https://rinkeby.infura.io/metamask');

const myaddress = '0x65D069D418E7d56bFc2C1d6D78c5dAd8A32D1882';
const contractAddress = '0xA7952c5097BA08891C2Dd963050C7B2465355AB1';

web3.eth.getBalance(myaddress, (err, wei) => { balance = web3.utils.fromWei(wei, 'ether');

document.getElementById('balance').textContent = balance;
document.getElementById('contractAddress').textContent = contractAddress;
document.getElementById('account').textContent = myaddress;
});