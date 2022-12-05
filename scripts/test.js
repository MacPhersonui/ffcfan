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

    this.FFCNFT = await FFCNFT.new(10, 1650, [1670310000, 1670583600, 1670310000, 1670396400, 1670310000, 1670396400, 1670403600, 1670490000, 1670497200, 1670583600])
    console.log("FFCNFT", this.FFCNFT.address)
    // await this.FFCNFT.seedAllowlist(["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"],["10"])
    // await this.FFCNFT.allowlistMint(1,0)
    // console.log((await this.FFCNFT.numberMinted(this.deployer)).toString())

    // await ethers.provider.send("evm_setNextBlockTimestamp", [1669860116])
    // await ethers.provider.send("evm_mine")

    // await this.FFCNFT.seedChargeAllowlist(['0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'], [30])
    // await this.FFCNFT.allowChargelistMint(20, 0, {
    //     value: hre.ethers.utils.parseEther("3", "ether")
    // })
    // await this.FFCNFT.allowChargelistMint(10, 0, {
    //     value: hre.ethers.utils.parseEther("1.5", "ether")
    // })
    // console.log((await this.FFCNFT.numberMinted(this.deployer)).toString())

    // await ethers.provider.send("evm_setNextBlockTimestamp", [1670060116])
    // await ethers.provider.send("evm_mine")
    // await this.FFCNFT.publicSaleMint(10, 0, {
    //     value: hre.ethers.utils.parseEther("1.5", "ether")
    // })
    // await this.FFCNFT.publicSaleMint(17, 0, {
    //     value: hre.ethers.utils.parseEther("2.55", "ether")
    // })
    // console.log((await this.FFCNFT.numberMinted(this.deployer)).toString())

    // await ethers.provider.send("evm_setNextBlockTimestamp", [1672060116])
    // await ethers.provider.send("evm_mine")

    // await this.FFCNFT.publicSaleMint(10, 0, {
    //     value: hre.ethers.utils.parseEther("2.5", "ether")
    // })

    // console.log((await this.FFCNFT.numberMinted(this.deployer)).toString())

    // await ethers.provider.send("evm_setNextBlockTimestamp", [1674060116])
    // await ethers.provider.send("evm_mine")

    // await this.FFCNFT.publicSaleMint(10, 0, {
    //     value: hre.ethers.utils.parseEther("3", "ether")
    // })
    // console.log((await this.FFCNFT.numberMinted(this.deployer)).toString())

    // // await this.FFCNFT.transferFrom(this.deployer, "0x5DDFE249E3F9F7F56e0cAc8fb57431FEAb836af5", 1)

    // await ethers.provider.send("evm_setNextBlockTimestamp", [1675060117])
    // await ethers.provider.send("evm_mine")

    // await this.FFCNFT.transferFrom(this.deployer, "0x5DDFE249E3F9F7F56e0cAc8fb57431FEAb836af5", 1)

    // await this.FFCNFT.publicSaleMint(100, 0, {
    //     value: hre.ethers.utils.parseEther("101", "ether")
    // })
    // console.log((await this.FFCNFT.numberMinted(this.deployer)).toString())



    console.log("End")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
