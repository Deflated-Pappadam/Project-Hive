require("@nomicfoundation/hardhat-toolbox");
const dotenv = require("dotenv");

dotenv.config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    matic: {
      url: process.env.POLYGON_RPC,
      accounts: [process.env.POLYGON_PRIVATE_KEY]
    }
  }
};