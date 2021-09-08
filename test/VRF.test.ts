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
  let contract: Contract;
  let solveContract: Contract;
  let vrfContract: Contract;
  let wallet: Wallet;
  
  // Define testing variables
  //uint x = 100;                                   // Sample input.
  //uint16 y = 10;                                  // Sample expected output.

  beforeEach(async () => {
    [wallet] = new MockProvider().getWallets();
    mockERC20 = await deployMockContract(wallet, IERC20.abi);
    contract = await deployContract(wallet, AmIRichAlready, [mockERC20.address]);
    solveContract = await deployContract(wallet, SolveContract, [mockERC20.address]);
    vrfContract = await deployContract(wallet, RandomNumberConsumer);
    //vrfContract = await deployContract(wallet, RandomNumberConsumer, [mockERC20.address]);
	//vrfContract = await deployContract( RandomNumberConsumer);
  });

  // custom test in VRF contract
  it('checks this address is returned correctly', async () => {
    expect(await contract.getAddressThis()).to.be.equal(123);
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
