require("@nomiclabs/hardhat-waffle");

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      gas: 3000000000,
      blockGasLimit: 30000000000
    },
  },
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/solidity/artifacts",
    sources: "./src/solidity/contracts",
    cache: "./src/solidity/cache",
    tests: "./src/solidity/test"
  },
};
