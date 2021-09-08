pragma solidity ^0.6.6;

//import 'ContractB.sol';
import "src/ContractB.sol";


contract ContractA{
	//1. call function of other contract
	//2. import keyword
	//3. contract interface
	//4. error propagation
	
	//1, interface of B => B
	//2. address of B

	address addressB;

	// Constructor to initialise the contract object.
    constructor() public {}

	function setAddressB(address _addressB) external{
		addressB = _addressB;
	}

	function callHelloWorld() external view returns(string memory) {
		InterfaceB b = InterfaceB(addressB);
		b.helloWord();
	}
	
	// Getter function for the address(this).
	function getAddressThis() public view returns (address) { 
		//return address(this);
		return addressB;
	}
}