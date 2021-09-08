pragma solidity ^0.6.6;


abstract contract InterfaceB{
	function helloWord() virtual external pure returns(string memory);
}

contract ContractB{
	function helloWord() external pure returns(string memory) {
		return 'helloWord';
	}

	function foo() external{

	}
}