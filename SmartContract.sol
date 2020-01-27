// deploy 0,000569 eth ~0.09 USD
// operation 0,000086 eth ~ 0.014 USD

// https://rinkeby.etherscan.io/address/0xA7952c5097BA08891C2Dd963050C7B2465355AB1#readContract

pragma solidity ^0.5.9;

// deploy 0,000569 eth ~0.09 USD
// operation 0,000086 eth ~ 0.014 USD
contract Ownable {
  address public owner;


  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);


  /**
   * @dev The Ownable constructor sets the original `owner` of the contract to the sender
   * account.
   */
  constructor() public {
    owner = msg.sender;
  }


  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }


  /**
   * @dev Allows the current owner to transfer control of the contract to a newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) public onlyOwner {
    require(newOwner != address(0));
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }

}
contract Haltable is Ownable {

    // @dev To Halt in Emergency Condition
    bool public halted = false;
    //empty contructor
    constructor() public {}

    // @dev Use this as function modifier that should not execute if contract state Halted
    modifier stopIfHalted {
      require(!halted);
      _;
    }

    // @dev Use this as function modifier that should execute only if contract state Halted
    modifier runIfHalted{
      require(halted);
      _;
    }

    // @dev called by only owner in case of any emergecy situation
    function halt() onlyOwner stopIfHalted public {
        halted = true;
    }
    // @dev called by only owner to stop the emergency situation
    function unHalt() onlyOwner runIfHalted public {
        halted = false;
    }
}
    
    
contract Base is Haltable { 
    
    // unix time => hash of base
    mapping (uint => string) public hashBase;


    // add to blockchain 
    // @param _date - date in unix format
    // @param _hash - keccak256 from base for some period 
    function SetToBase(uint _date, string memory _hesh) public onlyOwner stopIfHalted {
        hashBase[_date] = _hesh;
    }

    // check for data changes
    // @param _date - date of check
     function GetHash (uint _date) public view returns (string memory){
        return hashBase[_date];
    }

}