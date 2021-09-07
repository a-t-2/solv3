# Unit Test Solidity Contracts

## Installation
```
git clone git@github.com:a-t-2/chainlink.git
git clone test_vrf3
cd test_vrf3
sudo apt install npm
npm install
npm audit fix
npm install --save-dev ethereum-waffle
npm install @openzeppelin/contracts -D
npm i chai -D
npm i mocha -D
npx waffle
npx mocha
npm test
```
## Testing
Everytime you change something in the code, and you want to test it, run:
```
npx waffle
npx mocha
npm test
```
