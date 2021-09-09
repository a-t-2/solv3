pragma solidity ^0.6.6;

import "https://raw.githubusercontent.com/a-t-2/test_vrf3/actual-rand-square/src/SolveContract.sol";
import "https://raw.githubusercontent.com/a-t-2/test_vrf3/actual-rand-square/src/RandomNumberConsumer.sol";

interface IERC20 {
}

contract AmIRichAlready {
	// define original variables
	uint public richness = 1000000 * 10 ** 18;

	// define askroot variables
	bool solved;	// Boolean to denote if contract is solved.
	address payable owner;  // Owner of the contract, first this is the sponser.
	uint expiry;		// Get the time when the contract expires.

	// Create contract object for VRF contract
	RandomNumberConsumer randomNumberConsumer;

	constructor () public {
		
		// specify ask root constructor variables
		solved = false;		 //  Boolean value to indicate if contract is already solved.
		owner = msg.sender;	 //  Set the owner of the contract to the creator of the contract.
		expiry = 1612569800;	//  Unix timestamp of the moment of expiry.
	}


	// IS THIS NEEDED???: NO
	function setRichness(uint256 _richness) public {
	  richness = _richness;
	}
	
	
	// Include askroot functions
	//function test(address payable hunter) public payable {
	function differentFunctionName(address payable hunter) public payable {
		TemplateSolveContract solver = TemplateSolveContract(msg.sender); // The message sender is the contract activating the test function.
		uint x = 100;								   // Sample input.
		uint16 y = 10;								  // Sample expected output.
		require(y == solver.main(x), "Wrong output");   // Require the output of the main function to be y.
		solved = true;								  // Set solved to true.
		owner = hunter;								 // Set the ownership to the hunter.
		owner.transfer(address(this).balance);		  // Transfer the bounty to the hunter.
	}

	// Getter function for the solved variable.
	function getSolved() public view returns (bool){   
		return solved;
	}
	
	// Getter function for the Ownership.
	function getOwner() public view returns (address) { 
		return owner;
	}
	
	// Getter function for the address(this).
	function getAddressThis() public view returns (address) { 
		return address(this);
	}
	
	// Getter function for the address(this).
	function getAddressThisBalance() public view returns (uint256) { 
		return address(this).balance;
	}
	
	// Getter function for the balance of the contract.
	function getBalance() public view returns (uint) {
		return address(this).balance;
	}
	
	// Refund method to claim the value of the contract after expiry.
	function refund() public {
		require(msg.sender == owner && block.timestamp >= expiry, "Contract is not expired yet");   // The sender must own the contract and the contract must be expired.
		selfdestruct(owner);	// Let the contract selfdestruct and move the value to the owner.
	}

	// Function to call function from SolveContract
	function callHelloWorld(address solveContractAddress) external view returns(string memory) {
		InterfaceB b = InterfaceB(solveContractAddress);
		return b.helloWorld();
	}
	
	// Function to call function from RandomNumberConsumer
	function callHelloUniverse(address randomNumberConsumerAddres) external view returns(string memory) {
		InterfaceRandomN n = InterfaceRandomN(randomNumberConsumerAddres);
		return n.helloUniverse();
	}
	
	//function callUintSmallSquareFromVRFContract(address randomNumberConsumerAddres) external view returns (uint16) {
	//function callUintSmallSquareFromVRFContract(address randomNumberConsumerAddres) external payable view returns (uint16) {
	//function callUintSmallSquareFromVRFContract(address randomNumberConsumerAddres) external non-payable view returns (uint16) {
	function callUintSmallSquareFromVRFContract(address randomNumberConsumerAddres) external returns (uint16) {
		InterfaceRandomN p = InterfaceRandomN(randomNumberConsumerAddres);
		p.returnSomeSquare();
		return uint16(144);
		//return p.returnSomeSquare();
		//uint256 square = p.returnSomeSquare();
		//uint16 filler = 144; // yields error
		//return filler;
		//return 144; // works
		//return p.returnSomeSquare();
		//return uint16(p.someSquare);
		//return uint16(randomNumberConsumerAddres.someSquare);
		//return uint16(p.someSquare);
		//return uint16(p.returnSomeSquare(););
		//return uint16(p.returnSomeSquare()); // compiles
		//uint16 smallSquare = uint16(square);
		//return smallSquare;
	}
	
	function returnValueFromOtherContract(address randomNumberConsumerAddres) external returns (uint16) {
		
		
		return uint16(144);
	}

	// Then call this function manually
    function getVal(address randomNumberConsumerAddres) public view returns (uint256) {
        randomNumberConsumer = RandomNumberConsumer(randomNumberConsumerAddres);
		return randomNumberConsumer.somePublicValue();
    }
}

// For calling function from RandomNumberConsumer
//contract RandomNumberConsumer {  
		//function setA(uint) public returns (uint) {}
		//function a() public pure returns (uint) {}
//}

// TemplateSolveContract so the TestContract knows the structure of the SolveContract.
abstract contract TemplateSolveContract {
	function main(uint x) public virtual returns (uint);
}
