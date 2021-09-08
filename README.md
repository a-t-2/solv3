# Unit Test Solidity Contracts

## Installation
First run a sudo command like `sudo true` to make sure you have sudo rights before you run sudo apt install npm (I think otherwise the next line with the `npm install` might be seen as a password attempt). 
```
git clone git@github.com:a-t-2/chainlink.git
git clone git@github.com:a-t-2/test_vrf3.git
cd test_vrf3
sudo chmod +x run_tests.sh
sudo apt install npm
npm install
npm audit fix
npm install --save-dev ethereum-waffle
npm install @openzeppelin/contracts -D
npm i chai -D
npm i mocha -D
rm -r build
npx waffle
npx mocha
npm test
```
## Testing
Everytime you change something in the code, and you want to test it, run:
```
rm -r build
npx waffle
npm test
```
Or just run:
```
./run_tests.sh
```
## Import to remix
https://github.com/a-t-2/test_vrf3/blob/master/src/RandomNumberConsumer.sol
https://github.com/a-t-2/test_vrf3/blob/master/src/AmIRichAlready.sol
https://github.com/a-t-2/test_vrf3/blob/master/src/SolveContract.sol

Original
https://github.com/TruCol/TruCol/blob/main/contracts/AskContract.sol
https://github.com/TruCol/TruCol/blob/main/contracts/SolveContract.sol
