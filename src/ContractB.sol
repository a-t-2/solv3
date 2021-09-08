pragma solidity ^0.6.2;


abstract contract InterfaceB{
	function helloWord() virtual external pure returns(string memory);
	function foo() virtual external;
}

contract ContractB{
	function helloWord() external pure returns(string memory) {
		return 'helloWord';
	}

	function foo() external{

	}
}