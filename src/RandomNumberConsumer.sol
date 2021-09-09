pragma solidity ^0.6.6;


import "https://raw.githubusercontent.com/smartcontractkit/chainlink/develop/contracts/src/v0.6/VRFRequestIDBase.sol";
import "https://raw.githubusercontent.com/smartcontractkit/chainlink/develop/contracts/src/v0.6/interfaces/LinkTokenInterface.sol";
import "https://raw.githubusercontent.com/smartcontractkit/chainlink/develop/contracts/src/v0.6/vendor/SafeMathChainlink.sol";
import "https://raw.githubusercontent.com/smartcontractkit/chainlink/develop/contracts/src/v0.6/VRFConsumerBase.sol";
//import "https://raw.githubusercontent.com/a-t-2/chainlink/develop/SafeMath.sol";

abstract contract InterfaceRandomN{
	function helloUniverse() virtual external pure returns(string memory);
	function getRandomNumber() virtual external returns (bytes32 requestId);
	function returnSomeSquare() virtual external returns (uint256);
}

contract RandomNumberConsumer is VRFConsumerBase {
	 //using SafeMath for uint256;
	
	bool forTestingPurposes;	// Boolean to run test on this contract
	
	bytes32 internal keyHash;
	uint256 internal fee;
	
	uint256 public randomResult;
	uint256 public randomResultModulo;
	uint256 public randomResultSquared;
	
	uint256 public someSquare;
	
	/**
	 * Constructor inherits VRFConsumerBase
	 * 
	 * Network: Kovan
	 * Chainlink VRF Coordinator address: 0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9
	 * LINK token address:				0xa36085F69e2889c224210F603D836748e7dC0088
	 * Key Hash: 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4
	 */
	constructor() 
		VRFConsumerBase(
			0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, // VRF Coordinator
			0xa36085F69e2889c224210F603D836748e7dC0088  // LINK Token
		) public
	{
		keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
		fee = 0.1 * 10 ** 18; // 0.1 LINK
	}
	
	/** 
	 * Requests randomness from a user-provided seed
	 */
	function getRandomNumber() public returns (bytes32 requestId) {
		require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK - fill contract with faucet");
		return requestRandomness(keyHash, fee);
	}

	/**
	 * Callback function used by VRF Coordinator
	 */
	function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
		uint256 modulo = randomness.mod(6).add(2); // Maps random number to range 0 to 5, adds 2 to map to range 2 to 7.
		randomResult = uint16(modulo * modulo);
	}
	
	// Getter function for the forTestingPurposes boolean.
	function getForTestingPurposes() public view returns (bool){   
		return forTestingPurposes;
	}
	
	// Getter function for the address(this).
	function getAddressThis() public view returns (address) { 
		return address(this);
	}
	
	// Getter function for hardcoded random number.
	function getHardcodedNumber() public view returns (uint){   
		uint hardcodedRandomNumber = 121;
		return hardcodedRandomNumber;
	}
	
	// Getter function for hardcoded random number.
	function getHardcodedNumberMod() public view returns (uint){   
		uint hardcodedRandomNumber = 123;
		return hardcodedRandomNumber.mod(6).add(2);
	}
	
	// Getter function for hardcoded random number.
	function getHardcodedUintNumber() public view returns (uint256){   
		uint256 hardcodedUintNumber = 18446205110165755834005948204546580960626098221936403173208959885300094367089;
		return hardcodedUintNumber;
	}
	
	// Getter function for hardcoded random number.
	function getHardcodedUintNumberMod() public view returns (uint256){   
		uint256 hardcodedUintNumber = 18446205110165755834005948204546580960626098221936403173208959885300094367089;
		return hardcodedUintNumber.mod(8).add(2);
	}
	
	// Getter function for hardcoded random number.
	function getHardcodedUintNumberModSqured() public view returns (uint256){   
		uint256 hardcodedUintNumber = 18446205110165755834005948204546580960626098221936403173208959885300094367089;
		uint256 modulo = hardcodedUintNumber.mod(6).add(2);
		return modulo * modulo;
	}
	
	 // function to be called from another contract
	function helloUniverse() external pure returns(string memory) {
		return 'hello Universe';
	}
	
	// function to be called from another contract
	function returnSomeSquare()  public {
		// probably needs to be payable because you change something in this contract.
		someSquare = 144;
		//return someSquare;
	}
	
	// function to be called from another contract
	function getRandomResult()  public returns (uint256) {
		return someSquare;
	}
}