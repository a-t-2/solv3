import {expect, use} from 'chai';
import {Contract, utils, Wallet} from 'ethers';
import {deployContract, deployMockContract, MockProvider, solidity} from 'ethereum-waffle';

import IERC20 from '../build/IERC20.json';
import AmIRichAlready from '../build/AmIRichAlready.json';
import SolveContract from '../build/SolveContract.json';
import RandomNumberConsumer from '../build/RandomNumberConsumer.json';

import ContractA from '../build/ContractA.json';
import ContractB from '../build/ContractB.json';

use(solidity);

describe('ContractA Tests', () => {
	// Declare contracts
	let mockERC20: Contract;
	let askRootContract: Contract;
	let solveRootContract: Contract;
	let vrfContract: Contract;
	let contractA: Contract;
	let contractB: Contract;
	
	// Declare wallets
	let mockWallet: Wallet;
	let askRootWallet: Wallet;
	let solveRootWallet: Wallet;
	let vrfWallet: Wallet;
	let contractAWallet: Wallet;
	let contractBWallet: Wallet;

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
						{balance: '16862680000000000001', secretKey: '0x706618637b8ca922f6290ce1ecd4c31247e9ab75cf0530a0ac95c0332173d7c1'}, 
						{balance: '16862680000000000002', secretKey: '0x706618637b8ca922f6290ce1ecd4c31247e9ab75cf0530a0ac95c0332173d7c2'}, 
						{balance: '16862680000000000003', secretKey: '0x706618637b8ca922f6290ce1ecd4c31247e9ab75cf0530a0ac95c0332173d7c3'},
						{balance: '16862680000000000004', secretKey: '0x706618637b8ca922f6290ce1ecd4c31247e9ab75cf0530a0ac95c0332173d7c4'},
						{balance: '16862680000000000005', secretKey: '0x706618637b8ca922f6290ce1ecd4c31247e9ab75cf0530a0ac95c0332173d7c5'},
						{balance: '16862680000000000006', secretKey: '0x706618637b8ca922f6290ce1ecd4c31247e9ab75cf0530a0ac95c0332173d7c6'},
					]
				}
			}
		);
		
		[mockWallet, askRootWallet, solveRootWallet, vrfWallet, contractAWallet, contractBWallet] = provider.getWallets();
		mockERC20 = await deployMockContract(mockWallet, IERC20.abi);
		askRootContract = await deployContract(askRootWallet, AmIRichAlready, [mockERC20.address]);
		solveRootContract = await deployContract(solveRootWallet, SolveContract, [mockERC20.address]);
		vrfContract = await deployContract(vrfWallet, RandomNumberConsumer);
		//contractA = await deployContract(contractA, ContractA,  [mockERC20.address]);
		contractA = await deployContract(contractA, ContractA);
		//contractB = await deployContract(contractB, ContractB,  [mockERC20.address]);
		contractB = await deployContract(contractB, ContractB);
	});

	// custom test in AskRoot contract
	//it('checks contractA returns output of a function in contractB correctly', async () => {
	//	await contractA.setAddressB(contractBWallet.address);
	//	expect(await contractA.getAddressThis()).to.be.equal('0x82A666453d8aa239eEBE4578E83cD0988D62c83F');
	//});
	
	// custom test in VRF contract
	//it('checks contractB wallet address is returned correctly', async () => {
	//	expect(await contractA.setAddressB(contractBWallet.address)).to.be.equal('0x63E505e173BdbdD1b5DDB39dfAD716ed150e3466');
	//});
	
});
