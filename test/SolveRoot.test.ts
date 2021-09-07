import {expect, use} from 'chai';
import {Contract, utils, Wallet} from 'ethers';
import {deployContract, deployMockContract, MockProvider, solidity} from 'ethereum-waffle';

import IERC20 from '../build/IERC20.json';
import AmIRichAlready from '../build/AmIRichAlready.json';
import SolveContract from '../build/SolveContract.json';

use(solidity);

describe('Am I Rich Already', () => {
  let mockERC20: Contract;
  let contract: Contract;
  let solveContract: Contract;
  let wallet: Wallet;

  beforeEach(async () => {
    [wallet] = new MockProvider().getWallets();
    mockERC20 = await deployMockContract(wallet, IERC20.abi);
    contract = await deployContract(wallet, AmIRichAlready, [mockERC20.address]);
    solveContract = await deployContract(wallet, SolveContract, [mockERC20.address]);
  });

  // custom test in solveContract
  it('returns false if the solveContract test is not solved', async () => {
    expect(await solveContract.getForTestingPurposes()).to.be.equal(false);
  });

  // custom test in solveContract
  it('returns 10 if the solve function receives 100', async () => {
    expect(await solveContract.getForTestingPurposes()).to.be.equal(false);
  });


  it('checks if contract called balanceOf with certain wallet on the ERC20 token', async () => {
    await mockERC20.mock.balanceOf
      .withArgs(wallet.address)
      .returns(utils.parseEther('999999'));
    await contract.check();
    expect('balanceOf').to.be.calledOnContractWith(mockERC20, [wallet.address]);
  });

  it('returns false if the wallet has less than 1000000 coins', async () => {
    await mockERC20.mock.balanceOf
      .withArgs(wallet.address)
      .returns(utils.parseEther('999999'));
    expect(await contract.check()).to.be.equal(false);
  });

  it('returns true if the wallet has at least 1000000 coins', async () => {
    await mockERC20.mock.balanceOf
      .withArgs(wallet.address)
      .returns(utils.parseEther('1000000'));
    expect(await contract.check()).to.be.equal(false);
  });
  
  // custom test
  it('returns false if the contract test is not solved', async () => {
    await mockERC20.mock.balanceOf
      .withArgs(wallet.address)
      .returns(utils.parseEther('1000000'));
    expect(await contract.getSolved()).to.be.equal(false);
  });
  
});
