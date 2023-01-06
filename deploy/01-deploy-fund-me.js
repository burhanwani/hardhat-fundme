const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
require("dotenv").config()
// the below syntax is simillar to :
/* module.exports = async (hre) => {
        const {getNamedAccounts, deployments} = hre
    }
    which is simillar to : 
    module.exports = async (hre) => {
        getNamedAccounts = hre.getNamedAccounts
        deployments = hre.deployments
    }
    which is simillar to: 
    myFunction(hre) {
        getNamedAccounts = hre.getNamedAccounts
        deployments = hre.deployments
    }
    module.exports.default = myFunction
*/
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // If we want to test our fundMe contract on a local network, then we cannot use the official chainlink ethUsd Pricefeed adress
    // as that only runs either on testnet or mainnet. Therefore we will use a mock ethUsd pricefeed address for local testing. 
    let ethUsdPriceFeedAddress
    if (chainId == 31337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }
    log("----------------------------------------------------")
    log("Deploying FundMe and waiting for confirmations...")
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true,
        // we need to wait if on a live network so we can verify properly
        waitConfirmations: network.config.blockConfirmations || 1,
    })
    log(`FundMe deployed at ${fundMe.address}`)

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, [ethUsdPriceFeedAddress])
    }
}
// We can use tags on hardhat console to selectively run deploy functions from this script
module.exports.tags = ["all", "fundme"]