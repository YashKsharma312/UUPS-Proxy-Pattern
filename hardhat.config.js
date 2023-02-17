require("@nomicfoundation/hardhat-toolbox");
require('@openzeppelin/hardhat-upgrades');
require("dotenv").config();

const { API_URL, PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.10",
  defaultNetwork: "hardhat",
  networks: {
     hardhat: {},
     goerli: { 
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`],
        },
    },
};

