// https://habr.com/ru/post/345606/
    
// contract Base { 
    
//     // unix time => hash of base
//     mapping (uint => string) public hashBase;


//     // add to blockchain 
//     // @param _date - date in unix format
//     // @param _hash - keccak256 from base for some period 
//     function SetToBase(uint _date, string memory _hesh) public onlyOwner stopIfHalted {
//         hashBase[_date] = _hesh;
//     }

//     // check for data changes
//     // @param _date - date of check
//      function GetHash (uint _date) public view returns (string memory){
//         return hashBase[_date];
//     }

// }

pragma solidity ^0.4.18;
  
// бинес-логика
interface ICounter { 

  function increaseCounter(address _storage) public returns (uint);

  function getCounter(address _storage) public view returns (uint);

  function validateStorage(address _storage) public view returns (bool);

  function transferStorage(address _storage, address _counter) public returns (bool);
}



import "zeppelin-solidity/contracts/ownership/Ownable.sol";

contract UIntStorage is Ownable {
  
  uint private value;

  function setValue(uint _value) onlyOwner external returns (uint) {
    value = _value;
    return value;
  }

  function getValue() external view returns (uint) {
    return value;
  }

  function isUIntStorage() external pure returns (bool) {
    return true;
  }
}



import "./ICounter.sol";
import ".UIntStorage.sol";

contract IncrementCounter is ICounter, Ownable {
  
    modifier validStorage(address _storage) {
      require(validateStorage(_storage));
      _;
    }

  function increaseCounter(address _storage)// прибавляем к value +1 
    onlyOwner validStorage(_storage) 
    public returns (uint) 
  {
    UIntStorage counter = UIntStorage(_storage);
    require(counter.isUIntStorage());
    return counter.setValue(counter.getValue() + 1);
  }

  function getCounter(address _storage) // получаем value
    validStorage(_storage) 
    public view returns (uint) 
  {
    UIntStorage counter = UIntStorage(_storage);
    require(counter.isUIntStorage());
    return counter.getValue();
  }

  function validateStorage(address _storage) // true 
    public view returns (bool) 
  {
    return UIntStorage(_storage).isUIntStorage();
  }

  function transferStorage(address _storage, address _counter)
    onlyOwner validStorage(_storage) 
    public returns (bool) 
  {
    UIntStorage(_storage).transferOwnership(_counter);
    return true;
  }
}




import "./IncrementCounter.sol";

contract IncrementCounterPhaseTwo is IncrementCounter {
  
  function increaseCounter(address _storage) // теперь увеличиваем value на 10
    public returns (uint) 
  {
    UIntStorage counter = UIntStorage(_storage);
    return counter.setValue(counter.getValue() + 10);
  }
}

import "zeppelin-solidity/contracts/ownership/Ownable.sol";
import "./ICounter.sol";
import "../../base/UIntStorage.sol";

contract CounterController is Ownable {

  UIntStorage public store = new UIntStorage();

  ICounter public counter;

  event CounterUpdate(address previousCounter, address nextCounter);

  function updateCounter(address _counter) onlyOwner public returns (bool) // замена контракта базы
  {
    if (address(counter) != 0x0) {
      counter.transferStorage(store, _counter);

    } else {
      store.transferOwnership(_counter);
    }

    CounterUpdate(counter, _counter);
    counter = ICounter(_counter);
  }

  function increaseCounter() public returns (uint) {
    return counter.increaseCounter(store);
  }

  function getCounter() public view returns (uint) {
    return counter.getCounter(store);
  }
}