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
		askRootContract = await deployContract(askRootWallet, AmIRichAlready);
		//askRootContract = await deployContract(askRootWallet, AmIRichAlready, [askRootWallet.address]); // Does not work, yields transaction revert errors
		solveRootContract = await deployContract(solveRootWallet, SolveContract, [mockERC20.address]);
		vrfContract = await deployContract(vrfWallet, RandomNumberConsumer);
	});

	// custom test in AskRoot contract
	it('checks askRootContract address is returned correctly', async () => {
		expect(await askRootContract.getAddressThis()).to.be.equal('0x82A666453d8aa239eEBE4578E83cD0988D62c83F');
		
		// This test fails, so the contract address is different than the accompanying wallet addres.
		//expect(await askRootContract.getAddressThis()).to.be.equal(askRootWallet.address);
	});
	
	
	
	// custom test in AskRoot contract
	it('checks askRootWallet address balance is returned correctly', async () => {
		expect(await askRootContract.getAddressThisBalance()).to.be.equal(9001);
	});
	
	
	// custom test in VRF contract
	it('checks solveRootContract wallet address is returned correctly', async () => {
		expect(await solveRootContract.getAddressThis()).to.be.equal('0x63E505e173BdbdD1b5DDB39dfAD716ed150e3466');
	});
	
	// custom test in AskRoot contract for SolveRoot Contract
	it('checks askRootContract calls a function from SolveRoot correctly and returns the right answer', async () => {
		//expect(await askRootContract.callHelloWorld(await solveRootContract.getAddressThis())).to.be.equal('hello World');
		//expect(await askRootContract.callHelloWorld('0x63E505e173BdbdD1b5DDB39dfAD716ed150e3466')).to.be.equal('hello World');
		//expect(await askRootContract.callHelloWorld("0x63E505e173BdbdD1b5DDB39dfAD716ed150e3466")).to.be.equal('hello World');
		expect(await askRootContract.callHelloWorld(solveRootContract.address)).to.be.equal('hello World');
	});
	
	
	// custom test in AskRoot contract for SolveRoot Contract
	it('checks solveRootContract calls a function from SolveRoot correctly', async () => {
		//await token.balanceOf(wallet.address)
		//await askRootContract.callHelloWord(solveRootWallet.address)
		await askRootContract.callHelloWorld("0x63E505e173BdbdD1b5DDB39dfAD716ed150e3466")
		expect('helloWorld').to.be.calledOnContract(solveRootContract);
	});
	
	
	// custom test in AskRoot contract for VRF contract
	it('checks askRootContract calls a function from VRF Contract correctly and returns the right answer', async () => {
		expect(await askRootContract.callHelloUniverse(vrfContract.address)).to.be.equal('hello Universe');
	});
	
	
	// custom test in AskRoot contract for VRF contract
	it('checks solveRootContract calls a function from VRF Contract correctly', async () => {
		await askRootContract.callHelloUniverse(vrfContract.address)
		expect('helloUniverse').to.be.calledOnContract(vrfContract);
	});
	
	
	// custom test in AskRoot contract for VRF contract
	it('checks askRootContract calls a function from VRF Contract correctly and returns the a Uint16', async () => { 
		expect(await askRootContract.callUintSmallSquareFromVRFContract(vrfContract.address)).to.be.equal('144');
	});
	
	
	// custom test in AskRoot contract for VRF contract
	it('checks solveRootContract calls a function from VRF Contract correctly', async () => {
		await askRootContract.callUintSmallSquareFromVRFContract(vrfContract.address)
		expect('returnSomeSquare').to.be.calledOnContract(vrfContract);
	});
});
