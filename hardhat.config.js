//require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
//require("solidity-coverage")
require("hardhat-deploy")
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const GOERLI_RPC_URL =
    process.env.GOERLI_RPC_URL ||
    "https://eth-goerli.g.alchemy.com/v2/54DkdzKJjboHW-45yXusgxwfJyhy_trH"
const PRIVATE_KEY =
    process.env.PRIVATE_KEY 
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            // gasPrice: 130000000000,
        },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.9",
            },
            {
                version: "0.6.6" /*For compiling Chainlink mocks, other versions may give error*/,
            },
        ],
    },
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
        // customChains: [], // uncomment this line if you are getting a TypeError: customChains is not iterable

    },
    gasReporter: {
        enabled: false,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        // coinmarketcap: COINMARKETCAP_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
        },
    },
    mocha: {
        timeout: 500000,
    },
}