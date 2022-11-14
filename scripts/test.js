// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat")
const { ethers, upgrades } = require("hardhat")
const FFCNFT = artifacts.require("FFCNFT")


const delay = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms))

async function main() {
    await hre.run("compile")

    this.deployer = (await ethers.getSigners())[0].address
    console.log("deployer address", this.deployer)

    this.FFCNFT = await FFCNFT.new(1650, 1650, [0, 1668289333, 1668289334, 1688289335, 1688289349, 1688289360])

    await this.FFCNFT.seedAllowlist(["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"],["10"])
    await this.FFCNFT.allowlistMint()
    console.log((await this.FFCNFT.numberMinted(this.deployer)).toString())

    await this.FFCNFT.publicSaleMint(100,{
        value: hre.ethers.utils.parseEther("15", "ether")
    })
    await this.FFCNFT.publicSaleMint(200, {
        value: hre.ethers.utils.parseEther("31", "ether")
    })
    console.log((await this.FFCNFT.numberMinted(this.deployer)).toString())

    await ethers.provider.send("evm_setNextBlockTimestamp", [1668289335])
    await ethers.provider.send("evm_mine")

    await this.FFCNFT.publicSaleMint(100, {
        value: hre.ethers.utils.parseEther("25", "ether")
    })

    console.log((await this.FFCNFT.numberMinted(this.deployer)).toString())

    await ethers.provider.send("evm_setNextBlockTimestamp", [1688289337])
    await ethers.provider.send("evm_mine")

    await this.FFCNFT.publicSaleMint(100, {
        value: hre.ethers.utils.parseEther("101", "ether")
    })
    console.log((await this.FFCNFT.numberMinted(this.deployer)).toString())

    await ethers.provider.send("evm_setNextBlockTimestamp", [1688289350])
    await ethers.provider.send("evm_mine")

    await this.FFCNFT.publicSaleMint(100, {
        value: hre.ethers.utils.parseEther("101", "ether")
    })
    console.log((await this.FFCNFT.numberMinted(this.deployer)).toString())



    console.log("End")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
