import db from "../database/db.js"
import fs from "fs"
import Web3 from "web3"
import Sequelize from 'sequelize'
import e from "express"
import tokenConfig from "../../contract.config"
import {
  initWeb3,
  initETHWeb3,
  initContract
} from '../libs/utils'
import {
  utils
} from "ethers"

export async function getIDOData(req, res) {
  const web3 = initWeb3()
  const { ido } = tokenConfig
  const idoContract = new web3.eth.Contract(ido.abi, ido.address)

  const alreadyMint1 = await idoContract.methods.alreadyMint(0).call()
  const alreadyMint2 = await idoContract.methods.alreadyMint(1).call()
  const alreadyMint3 = await idoContract.methods.alreadyMint(2).call()
  const alreadyMint4 = await idoContract.methods.alreadyMint(2).call()

  const publicSaleStartTime1 = await idoContract.methods.publicSaleStartTime(0).call()
  const publicSaleStartTime2 = await idoContract.methods.publicSaleStartTime(1).call()
  const publicSaleStartTime3 = await idoContract.methods.publicSaleStartTime(2).call()
  const publicSaleStartTime4 = await idoContract.methods.publicSaleStartTime(3).call()
  const publicSaleStartTime5 = await idoContract.methods.publicSaleStartTime(4).call()
  const publicSaleStartTime6 = await idoContract.methods.publicSaleStartTime(5).call()

  const freeMintStartTime = await idoContract.methods.freeMintStartTime().call()
  const whiteListMintStartTime = await idoContract.methods.whiteListMintStartTime().call()
  const whiteListMintEndTime = await idoContract.methods.whiteListMintEndTime().call()
  const totalSupply = await idoContract.methods.totalSupply().call()
  const round = await idoContract.methods.getRound().call() * 1

    res.send({
      alreadyMint: [alreadyMint1, alreadyMint2, alreadyMint3, alreadyMint4],
      publicSaleStartTime: [freeMintStartTime, whiteListMintStartTime, publicSaleStartTime1, publicSaleStartTime2, publicSaleStartTime3, publicSaleStartTime4, publicSaleStartTime5, publicSaleStartTime6],
      whiteListMintEndTime: whiteListMintEndTime,
      totalSupply: totalSupply,
      round: round
    })

}