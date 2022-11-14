import db from "../database/db.js"
import fs from "fs"
import Web3 from "web3"
import Sequelize from 'sequelize';
import e from "express";
import { isFullSolcOutput } from "@openzeppelin/hardhat-upgrades/dist/utils/is-full-solc-output.js";
const Op = db.Op
const INVITE = db.INVITE
const INVITETOTAL = db.INVITETOTAL

// export async function getInviteCount(account){
//   let sql = {
//     attributes: [
//       "account",
//       "invite"
//     ],
//     where: {
//       invite: account
//     }
//   }

//   let inviteCount = 0

//   const data = await INVITE.findAndCountAll(sql)
//   if (data) {
//     inviteCount = data.count
//     let inviterArr = []
//     for (var i = 0; i < data.rows.length; i++) {
//       inviterArr.push(data.rows[i].account)
//     }
//     const inviteSecond = await INVITE.count({
//       where: {
//         invite: {
//           [Op.in]: inviterArr
//         }
//       }
//     })
//     inviteCount += inviteSecond
//     return inviteCount
//   } else {
//     return inviteCount
//   }
// }

export async function invite(req, res) {
  const { account } = req.params;
  if (!account) {
    res.send({})
    return
  }

  const count = await INVITETOTAL.findOne({
    attributes: [
      "total"
    ],
    where: {
      account: account
    }
  })

  const rows = await INVITE.findAll({
    where : {
      invite: account,
      state: 1
    }
  })


  const inviteRank = JSON.parse(JSON.stringify(rows))
  for (var i = 0; i < inviteRank.length; i++) {
    const count = await INVITE.count({
      where : {
        invite: inviteRank[i].account,
        state: 1,
        ga: {
          [Op.not]: ""
        }
      }
    })
    inviteRank[i].count = count
  }

  res.send({
    count: !!count ? count : 0,
    rows: inviteRank
  })
  
}

// export async function inviteRank(req, res) {
//   let sql = {
//     attributes: [
//       [Sequelize.fn('COUNT', '*'), 'count'],
//       "invite"
//     ],
//     group: "invite",
//     where:{
//       ga: {
//         [Op.not]: ""
//       }
//     },
//     limit: 10,
//     order: [
//       [Sequelize.col('count'), 'DESC']
//     ],
//   }

//   const inviteRank = JSON.parse(JSON.stringify(await INVITE.findAll(sql)))
//   for (var i = 0; i < inviteRank.length; i++) {
//     const count = await getInviteCount(inviteRank[i].invite)
//     inviteRank[i].count = count
//   }
//   res.send(inviteRank)
// }

export async function inviteRank(req, res) {
  const data = await INVITETOTAL.findAll({
    limit: 10,
    order: [
            [Sequelize.col('total'), 'DESC']
          ],
  })
  res.send(data)
}

export async function createInvite(req, res) {
  let {
    account,
    invite
  } = req.body
  if (account == invite){
    res.send({
      msg: "Error"
    })
    return
  }
  if (!account){
      res.send({
        msg: "Error"
      })
      return
  }
  if (!invite ){
    invite = "0x0000000000000000000000000000000000000000"
  }
  const ga = !!req.cookies._ga ? req.cookies._ga : ""
  const alreadyHave = await INVITE.count({
    where:{
      account: account,
      state: 1
    }
  })

  if (alreadyHave > 0){
    res.send({
      msg: "Already invited"
    })
    return
  }

  const result = await INVITE.create({
    account: account,
    invite: invite,
    ga: ga,
    state: 1,
  })

  const alreadyHave2 = await INVITETOTAL.count({
    where: {
      account: invite,
      state: 1,
    }
  })

  if(ga != ""){
    if (alreadyHave2 == 0) {
      const result2 = await INVITETOTAL.create({
        account: invite,
        total: 1,
        state: 1,
      })
    } else {
      await INVITETOTAL.increment({
        total: 1
      }, {
        where: {
          account: invite,
          state: 1,
        }
      })
    }
      const inviterData = await INVITE.findAll({
        attributes: [
          "invite"
        ],
        where: {
          account: invite,
          state: 1,
        }
      })
      let inviterArr = []
      for (var i = 0; i < inviterData.length; i++) {
        inviterArr.push(inviterData[i].invite)
      }
      console.log("inviterArr", inviterArr)
      await INVITETOTAL.increment({
        total: 1
      }, {
        where: {
          state: 1,
          account: {
            [Op.in]: inviterArr
          }
        }
      })
  }

  if (result) {
    res.send({
      msg: "Success"
    })
  } else {
    res.send({
      msg: "Fail"
    })
  }
}

export async function tree(req, res) {
  const { account } = req.params;
  if (!account) {
    res.send({})
    return
  }
  console.log(account)
  let total = 0
  let rows = await INVITE.findAll({
    where: {
      invite: account,
      state: 1
    }
  })
  total += rows.length
  rows = JSON.parse(JSON.stringify(rows))
  for (var i = 0; i < rows.length; i++) {
    let data = await INVITE.findAll({
      where: {
        invite: rows[i].account,
        state: 1
      }
    })
    rows[i].children = JSON.parse(JSON.stringify(data))
    rows[i].count = rows[i].children.length
    total += rows[i].count
    for (var j = 0; j < rows[i].children.length; j++) {
      let data = await INVITE.findAll({
        where: {
          invite: rows[i].children[j].account,
          state: 1
        }
      })
      rows[i].children[j].children = JSON.parse(JSON.stringify(data))
      rows[i].children[j].count = rows[i].children[j].children.length
      total += rows[i].children[j].count
      for (var k = 0; k < rows[i].children[j].children.length; k++){
        let data = await INVITE.findAll({
          where: {
            invite: rows[i].children[j].children[k].account,
            state: 1
          }
        })
        rows[i].children[j].children[k].children = JSON.parse(JSON.stringify(data))
        rows[i].children[j].children[k].count = rows[i].children[j].children[k].children.length
        total += rows[i].children[j].children[k].count
        for (var l = 0; l < rows[i].children[j].children[k].children.length; l++) {
          let data = await INVITE.findAll({
            where: {
              invite: rows[i].children[j].children[k].children[l].account,
              state: 1
            }
          })
          rows[i].children[j].children[k].children[l].children = JSON.parse(JSON.stringify(data))
          rows[i].children[j].children[k].children[l].count = rows[i].children[j].children[k].children[l].children.length
          total += rows[i].children[j].children[k].children[l].count
          for (var m = 0; m < rows[i].children[j].children[k].children[l].children.length; m++) {
            let data = await INVITE.findAll({
              where: {
                invite: rows[i].children[j].children[k].children[l].children[m].account,
                state: 1
              }
            })
            rows[i].children[j].children[k].children[l].children[m].children = JSON.parse(JSON.stringify(data))
            rows[i].children[j].children[k].children[l].children[m].count = rows[i].children[j].children[k].children[l].children[m].children.length
            total += rows[i].children[j].children[k].children[l].children[m].count
            for (var n = 0; n < rows[i].children[j].children[k].children[l].children[m].children.length; n++) {
              let data = await INVITE.findAll({
                where: {
                  invite: rows[i].children[j].children[k].children[l].children[m].children[n].account,
                  state: 1
                }
              })
              rows[i].children[j].children[k].children[l].children[m].children[n].children = JSON.parse(JSON.stringify(data))
              rows[i].children[j].children[k].children[l].children[m].children[n].count = rows[i].children[j].children[k].children[l].children[m].children[n].children.length
              total += rows[i].children[j].children[k].children[l].children[m].children[n].count
            }
          }
        }
      }
    }
  }
  res.send({
    account: account,
    count: total,
    children: rows
  })
}