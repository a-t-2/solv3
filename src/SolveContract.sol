// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;

// Example contract of a TestContract.
contract SolveContract {
	
	bool forTestingPurposes;    // Boolean to run test on this contract
	
    TemplateTestContract testContract;  // Create variable for the testContract which needs to be solved.
    address payable owner;              // Create variable for the owner which solves the test contract.

    // Constructor to initialise the contract variables.
    constructor(address testAddress) public payable {
        testContract = TemplateTestContract(testAddress);   // Initialise the testContract variable.
        owner = msg.sender;                                 // Initialise the owner of the contract to be the creator of the contract.
    }
    
    // Function to solve the testContract.
    function solve() public payable returns(uint256){
        testContract.differentFunctionName(owner);
		return owner.balance;
    }

    // Example of the main function which solves the testContract.
    // Calculates the squre root function.
    function main(uint x) pure public returns(uint y) {
        uint z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }
	
	
	// Getter function for the Ownership.
    function getOwner() public view returns (address) { 
        return owner;
    }
	
	// Getter function for the address(this).
	function getAddressThis() public view returns (address) { 
		return address(this);
	}
	
	// Getter function for the balance of the contract.
    function getBalance() public view returns (uint) {
        return address(this).balance;
		//return testAddress.balance;
		//return owner.balance;
    }
	
	// Getter function for the forTestingPurposes boolean.
    function getForTestingPurposes() public view returns (bool){   
        return forTestingPurposes;
    }
	
}

// TemplateTestContract so the SolveContract knows the structure of the testContract.
abstract contract TemplateTestContract {
    function differentFunctionName(address payable hunter) public virtual;
}
