require("@nomicfoundation/hardhat-toolbox");

const path = require("path");

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
        settings: {}
      }
    ],
    compilerPath: path.join(__dirname, "node_modules", "solc", "soljson.js")
  },
  defaultNetwork: "hardhat"
};
