// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat")
const { ethers, upgrades } = require("hardhat")
const TOR = artifacts.require("TOR")
const WETH9 = artifacts.require("WETH9")
const UniswapV2Factory = artifacts.require("UniswapV2Factory")
const UniswapV2Router02 = artifacts.require("UniswapV2Router02")

const IterableMapping = artifacts.require("IterableMapping")
const DividendPayingToken = artifacts.require("DividendPayingToken")
const BABYTOKENDividendTracker = artifacts.require("BABYTOKENDividendTracker")
const BABYTOKEN = artifacts.require("BABYTOKEN")

async function main() {
    await hre.run("compile")

    this.deployer = (await ethers.getSigners())[0].address
    console.log("deployer address", this.deployer)

    // this.WETH9 = await WETH9.new(this.deployer)
    // console.log("WETH9", this.WETH9.address)

    // this.UniswapV2Factory = await UniswapV2Factory.new(this.deployer)
    // console.log("UniswapV2Factory", this.UniswapV2Factory.address)

    // this.UniswapV2Router02 = await UniswapV2Router02.new(this.UniswapV2Factory.address, this.WETH9.address)
    // console.log("UniswapV2Router02", this.UniswapV2Router02.address)

    // this.TOR = await TOR.new(this.deployer)
    // console.log("TOR", this.TOR.address)

    // console.log((await this.TOR.balanceOf(this.deployer)).toString())
    // await this.TOR.transfer("0x10ED43C718714eb63d5aA57B78B54704E256024E", 100)
    // console.log((await this.TOR.balanceOf(this.deployer)).toString())
    // console.log((await this.TOR.balanceOf("0x10ED43C718714eb63d5aA57B78B54704E256024E")).toString())

    // await this.TOR.approve(this.UniswapV2Router02.address,"9999999999999999")
    // await this.UniswapV2Router02.swapExactETHForTokens(
    //     "231162833465767331",
    //     [
    //         "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    //         this.TOR.address
    //     ],
    //     this.deployer,
    //     "9659539153"
    // )

    // this.IterableMapping = await IterableMapping.new()
    // console.log("IterableMapping", this.IterableMapping.address)

    // this.DividendPayingToken = await DividendPayingToken.new()
    // console.log("DividendPayingToken", this.DividendPayingToken.address)

    // const Tracker = await ethers.getContractFactory("BABYTOKENDividendTracker", {
    //     libraries: {
    //         IterableMapping: this.IterableMapping.address
    //     }
    // })

    // const tracker = await Tracker.deploy()
    // await tracker.deployed()
    // console.log("BABYTOKENDividendTracker", tracker.address)

    // const Greeter = await ethers.getContractFactory("BABYTOKEN");
    // const greeter = await Greeter.deploy("NIGGER", "NIG", 100000,
    //     [this.DividendPayingToken.address, this.UniswapV2Router02.address, "0xc5b2e6b56ea6b3b6ffe19103f33288b90ffa1633", tracker.address], [1, 2, 3], 1, this.deployer, 0);
    // await greeter.deployed();
    // console.log("BABYTOKEN", greeter.address);

    // await tracker.initialize(greeter.address, 500);

    // console.log((await greeter.balanceOf(this.deployer)).toString())

    console.log("End")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
