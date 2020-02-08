// deploy 0,00063 eth ~0.09 USD
// operation 0,000086 eth ~ 0.014 USD

// Contract 0x9B8B3768294f74e2F41DCd4d6a92815E450a4C78

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
    
    // unix time => hash of base (mapping key in solidity is encoded on 32 bytes, so there is 2**(256) possible key)
    mapping (uint => string) public hashBase;

    //event in blockchain after write operation
    event Write(uint date, string hash);

    // the record count  
    uint public counter;
   
    //  Calculate the length of hashBase
    function GetCounter() public view returns (uint){
      return counter;
    } 

    // add to blockchain 
    // @param _date - date in unix format
    // @param _hash - keccak256 from base for some period 
    function WriteToBase(uint _date, string memory _hash) public onlyOwner stopIfHalted {
        hashBase[_date] = _hash;
        counter++;
        emit Write(_date, _hash);
    }

    // check for data changes
    // @param _date - date of check
     function GetHash (uint _date) public view returns (string memory){
        return hashBase[_date];
    }

    //  OPTIONAL
    // converts hash string to bytes (need for optimisation)
    function string_tobytes( string memory _hash) internal pure returns (bytes memory){
    bytes memory hash = bytes(_hash);
        return hash;
    }
}