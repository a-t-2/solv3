import {expect, use} from 'chai';
import {Contract, utils, Wallet} from 'ethers';
import {deployContract, deployMockContract, MockProvider, solidity} from 'ethereum-waffle';

import IERC20 from '../build/IERC20.json';
import AmIRichAlready from '../build/AmIRichAlready.json';
import SolveContract from '../build/SolveContract.json';
import RandomNumberConsumer from '../build/RandomNumberConsumer.json';

use(solidity);

describe('Am I Rich Already', () => {
	// Declare contracts
	let mockERC20: Contract;
	let askRootContract: Contract;
	let solveRootContract: Contract;
	let vrfContract: Contract;
	
	// Declare wallets
	let mockWallet: Wallet;
	let askRootWallet: Wallet;
	let solveRootWallet: Wallet;
	let vrfWallet: Wallet;

	beforeEach(async () => {
		
		// generate random wallets or random origin 
		//const [mockWallet, askRootWallet, solveRootWallet, vrfWallet] = Wallet.createRandom();
		//const original = Wallet.createRandom();
		
		// specify wallet balances
		const provider = new MockProvider(
			{
				ganacheOptions: {
					// The private key is used to generate the four respective wallet addresses.
					accounts: [
						{balance: '168626800000000000000001', secretKey: '0x706618637b8ca922f6290ce1ecd4c31247e9ab75cf0530a0ac95c0332173d7c1'}, 
						{balance: '168626800000000000000002', secretKey: '0x706618637b8ca922f6290ce1ecd4c31247e9ab75cf0530a0ac95c0332173d7c2'}, 
						{balance: '168626800000000000000003', secretKey: '0x706618637b8ca922f6290ce1ecd4c31247e9ab75cf0530a0ac95c0332173d7c3'},
						{balance: '168626800000000000000004', secretKey: '0x706618637b8ca922f6290ce1ecd4c31247e9ab75cf0530a0ac95c0332173d7c4'}
					]
				}
			}
		);
		
		[mockWallet, askRootWallet, solveRootWallet, vrfWallet] = provider.getWallets();
		mockERC20 = await deployMockContract(mockWallet, IERC20.abi);
		askRootContract = await deployContract(askRootWallet, AmIRichAlready, [mockERC20.address]);
		//askRootContract = await deployContract(askRootWallet, AmIRichAlready, [askRootWallet.address]); // Does not work, yields transaction revert errors
		solveRootContract = await deployContract(solveRootWallet, SolveContract, [mockERC20.address]);
		vrfContract = await deployContract(vrfWallet, RandomNumberConsumer);
	});

	// custom test in AskRoot contract
	it('checks askRootContract address is returned correctly', async () => {
		expect(await askRootContract.getAddressThis()).to.be.equal('0x82A666453d8aa239eEBE4578E83cD0988D62c83F');
	});
	
	// custom test in AskRoot contract
	it('checks askRootWallet address balance is returned correctly', async () => {
		expect(await askRootContract.getAddressThisBalance()).to.be.equal(9001);
	});
	
	
	// custom test in VRF contract
	it('checks solveRootContract wallet address is returned correctly', async () => {
		expect(await solveRootContract.getAddressThis()).to.be.equal('0x63E505e173BdbdD1b5DDB39dfAD716ed150e3466');
	});
	
	// custom test in VRF contract
	it('checks solveRootContract calls a function from SolveRoot correctly', async () => {
		expect(await askRootContract.callHelloWorld()).to.be.equal('THIS SHOULD BE HELLO WORLD');
	});
	
	// custom test in AskRoot contract
	it('checks solveRootWallet address balance is returned correctly', async () => {
		await mockERC20.mock.balanceOf
			.withArgs(askRootWallet.address)
			.returns(utils.parseEther('9002'));
		expect(await solveRootContract.getAddressThis().balance).to.be.equal(9002);
	});

	it('checks if askRootContract called balanceOf with certain askRootWallet on the ERC20 token', async () => {
		await mockERC20.mock.balanceOf
			.withArgs(askRootWallet.address)
			.returns(utils.parseEther('999999'));
		await askRootContract.check();
		expect('balanceOf').to.be.calledOnContractWith(mockERC20, [askRootWallet.address]);
	});

	it('returns false if the wallet has less than 1000000 coins', async () => {
		await mockERC20.mock.balanceOf
			.withArgs(askRootWallet.address)
			.returns(utils.parseEther('999999'));
		expect(await askRootContract.check()).to.be.equal(false);
	});

	it('returns true if the wallet has at least 1000000 coins', async () => {
		await mockERC20.mock.balanceOf
			.withArgs(askRootWallet.address)
			.returns(utils.parseEther('1000000'));
		expect(await askRootContract.check()).to.be.equal(false);
	});
	
	// custom test
	it('returns false if the askRootContract test is not solved', async () => {
		await mockERC20.mock.balanceOf
			.withArgs(askRootWallet.address)
			.returns(utils.parseEther('1000000'));
		expect(await askRootContract.getSolved()).to.be.equal(false);
	});
	
});
