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
  const limitPromise = [],
    pricePromise = [],
    mintedPromise = [],
    timePromise = []
  for (let index = 0; index < 5; index++) {
    limitPromise.push(idoContract.methods.publicPrice(index).call())
    pricePromise.push(idoContract.methods.mintLimit(index).call())
    mintedPromise.push(idoContract.methods.alreadyMint(index).call())
  }
  for (let index = 0; index < 10; index++) {
    timePromise.push(idoContract.methods.publicSaleStartTime(index).call())
  }
  
  const mintLimit = await Promise.all(limitPromise)
  const publicPrice = await Promise.all(pricePromise)
  const alreadyMint = await Promise.all(mintedPromise)
  const publicSaleStartTime = await Promise.all(timePromise)
  const totalSupply = await idoContract.methods.totalSupply().call()

    res.send({
      alreadyMint,
      publicSaleStartTime,
      totalSupply,
      mintLimit,
      publicPrice
    })

}