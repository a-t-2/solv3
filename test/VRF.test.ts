import {expect, use} from 'chai';
import {Contract, utils, Wallet} from 'ethers';
import {deployContract, deployMockContract, MockProvider, solidity} from 'ethereum-waffle';

import IERC20 from '../build/IERC20.json';
import AmIRichAlready from '../build/AmIRichAlready.json';
import SolveContract from '../build/SolveContract.json';
import RandomNumberConsumer from '../build/RandomNumberConsumer.json';

use(solidity);

describe('VRF Contract Tests', () => {
	let mockERC20: Contract;
	let askRootContract: Contract;
	let solveRootContract: Contract;
	let vrfContract: Contract;
	let mockWallet: Wallet;
	let askRootWallet: Wallet;
	let solveRootWallet: Wallet;
	let vrfWallet: Wallet;
	
	// Define testing variables
	//uint x = 100;																	 // Sample input.
	//uint16 y = 10;																	// Sample expected output.

	beforeEach(async () => {
	[mockWallet, askRootWallet, solveRootWallet, vrfWallet] = new MockProvider().getWallets();
		mockERC20 = await deployMockContract(mockWallet, IERC20.abi);
		askRootContract = await deployContract(askRootWallet, AmIRichAlready, [mockERC20.address]);
		solveRootContract = await deployContract(solveRootWallet, SolveContract, [mockERC20.address]);
		vrfContract = await deployContract(vrfWallet, RandomNumberConsumer);
		//vrfContract = await deployContract(wallet, RandomNumberConsumer, [mockERC20.address]);
	//vrfContract = await deployContract( RandomNumberConsumer);
	});

	// custom test in VRF contract
	it('checks askRootContract wallet address is returned correctly', async () => {
		expect(await askRootContract.getAddressThis()).to.be.equal('0x54421e7a0325cCbf6b8F3A28F9c176C77343b7db');
	});

	// custom test in VRF contract
	it('checks solveRootContract wallet address is returned correctly', async () => {
		expect(await solveRootContract.getAddressThis()).to.be.equal('0xc4B75c606DcacbCc41b7364CB090170d6E65b441');
	});

	// custom test in VRF contract
	it('checks vrfContract wallet address is returned correctly', async () => {
		expect(await vrfContract.getAddressThis()).to.be.equal('0x1b9B96a9BAc7dF3cC3fb886F621520844d0a5887');
	});

	// custom test in vrfContract
	it('returns false if the vrfContract test is not solved', async () => {
		expect(await vrfContract.getForTestingPurposes()).to.be.equal(false);
	});
	

	
	// custom test in vrfContract
	it('Tests if a random number is returned', async () => {
		expect(await vrfContract.getRandomNumber()).to.be.equal(7);
	});
	
});
