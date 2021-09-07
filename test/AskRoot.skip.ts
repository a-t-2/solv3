import {expect, use} from 'chai';
import {Contract, utils, Wallet} from 'ethers';
import {deployContract, deployMockContract, MockProvider, solidity} from 'ethereum-waffle';

//import IERC20 from '../build/IERC20.json';
// import AmIRichAlready from '../build/AmIRichAlready.json';
import AskContract from '../build/AskContract.json';

use(solidity);

describe('AskRoot', () => {
  //let mockERC20: Contract;
  let contract: Contract;
  //let wallet: Wallet;

  beforeEach(async () => {
    //[wallet] = new MockProvider().getWallets();
    // mockERC20 = await deployMockContract(wallet, IERC20.abi);
     // contract = await deployContract();
	// contract = await deployContract(wallet, AskContract, [mockERC20.address]);
	contract = await deployContract(AskContract);
  });
    
  // custom test
  it('returns false if the contract test is not solved', async () => {
    //await mockERC20.mock.balanceOf
    //  .withArgs(wallet.address)
    //  .returns(utils.parseEther('1000000'));
    expect(await contract.getSolved()).to.be.equal(false);
  });
  
});
