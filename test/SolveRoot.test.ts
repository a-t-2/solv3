import {expect, use} from 'chai';
import {Contract, utils, Wallet} from 'ethers';
import {deployContract, deployMockContract, MockProvider, solidity} from 'ethereum-waffle';

import IERC20 from '../build/IERC20.json';
import AmIRichAlready from '../build/AmIRichAlready.json';
import SolveContract from '../build/SolveContract.json';

use(solidity);

describe('AskRootContract Tests', () => {
  let mockERC20: Contract;
  let solveContract: Contract;
  let wallet: Wallet;
  
  // Define testing variables
  //uint x = 100;                                   // Sample input.
  //uint16 y = 10;                                  // Sample expected output.

  beforeEach(async () => {
    [wallet] = new MockProvider().getWallets();
    mockERC20 = await deployMockContract(wallet, IERC20.abi);
    solveContract = await deployContract(wallet, SolveContract, [mockERC20.address]);
  });

	// custom test in solveContract
  it('returns 7 after solving the askcontract', async () => {
    expect(await solveContract.solve()).to.be.equal(7);
  });

  // custom test in solveContract
  it('returns false if the solveContract test is not solved', async () => {
    expect(await solveContract.getForTestingPurposes()).to.be.equal(false);
  });

  // custom test in solveContract
  it('returns 10 if the solve function receives 100', async () => {
    //expect(await solveContract.main(x)).to.be.equal(y);
    expect(await solveContract.main(100)).to.be.equal(10);
  });

  // custom test in solveContract
  it('Trows error if expect returns 9 if the SolveRoot main function receives 100', async () => {
    //expect(await solveContract.main(x)).to.be.equal(y);
    expect(await solveContract.main(100)).to.be.equal(9);
  });

  // custom test in solveContract
  it('Returns the owner(=wallet address) of the SolveRoot contract', async () => {
    // hardcoding the mock address works
	//expect(await solveContract.getOwner()).to.be.equal("0x17ec8597ff92C3F44523bDc65BF0f1bE632917ff");
    expect(await solveContract.getOwner()).to.be.equal(wallet.address);
  });

  // custom test in solveContract
  it('Returns the account balance owner(=wallet address) of the SolveRoot contract', async () => {
    expect(await solveContract.getBalance()).to.be.equal(0);
  });
  
});
