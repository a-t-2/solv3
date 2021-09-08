import {expect, use} from 'chai';
import {Contract, utils, Wallet} from 'ethers';
import {deployContract, deployMockContract, MockProvider, solidity} from 'ethereum-waffle';

import IERC20 from '../build/IERC20.json';
import AmIRichAlready from '../build/AmIRichAlready.json';

use(solidity);

describe('Am I Rich Already', () => {
	let mockERC20: Contract;
	let askRootContract: Contract;
	let mockWallet: Wallet;
	let askRootWallet: Wallet;
	let solveRootWallet: Wallet;
	let vrfWallet: Wallet;

	beforeEach(async () => {
		[mockWallet, askRootWallet, solveRootWallet, vrfWallet] = new MockProvider().getWallets();
		mockERC20 = await deployMockContract(mockWallet, IERC20.abi);
		askRootContract = await deployContract(askRootWallet, AmIRichAlready, [mockERC20.address]);
	});

	// custom test in AskRoot contract
	it('checks askRootContract address is returned correctly', async () => {
		expect(await askRootContract.getAddressThis()).to.be.equal('0x54421e7a0325cCbf6b8F3A28F9c176C77343b7db');
	});
	
	// custom test in AskRoot contract
	it('checks this address balance is returned correctly', async () => {
		expect(await askRootContract.getAddressThisBalance()).to.be.equal(9001);
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
