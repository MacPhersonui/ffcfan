import React, { useState, useEffect } from "react"
import styles from "../styles/index.module.scss"
import classNames from "classnames/bind"
import Web3 from "web3"
import useWallet from "use-wallet"
import HeaderFooter from "../layout/HeaderFooter"
import Clipboard from 'react-clipboard.js'
import Process from '../components/process'
import Deadline from '../components/deadline'
import { ToastContainer, } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { withRouter, useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import tokenConfig from "../contract.config"
import { confirmAlert } from "react-confirm-alert"
import {
  utils
} from "ethers"

const cx = classNames.bind(styles)

const Mint = () => {
  const {
    t
  } = useTranslation('common')
  const router = useRouter()
  const wallet = useWallet()
  const {
    account,
    ethereum
  } = wallet
  const tabs = [
    {
      name: t('phase0'),
      id: 0
    },
    {
      name: t('phase1'),
      id: 1
    },
    {
      name: t('phase2'),
      id: 2
    },
    {
      name: t('phase3'),
      id: 3
    }
  ]
  const web3 = new Web3(ethereum)
  const [swapCount, setSwapCount] = useState(4)
  const [scrolling] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)
  const [passcard, setPasscard] = useState(1600)
  const [circulation, setCirculation] = useState(600)
  const [percent, setPercent] = useState(0)
  const [unitPrice, setUnitPrice] = useState(0)
  const [expirydate, setExpirydate] = useState(['1669305362', '1669505362', '1669705362', '1669905362'])
  const [publicPrice, setPublicPrice] = useState([0, 0.15,0.25,0.3])
  const [mintLimit, setMintLimit] = useState([50, 300, 500, 800])
  const [alreadyMint, setAlreadyMint] = useState([0, 0,0,0])
  const [publicSaleStartTime, setPublicSaleStartTime] = useState([0,0,0,0,0,0])
  const [round, setRound] = useState(0)
  const [show, setShow] = useState(true)
  const [freemintNum, setFreemintNum] = useState(0)
  const [whiteListMintNum, setWhiteListMintNum] = useState(0)
  const [mintNum, setMintNum] = useState(0)
  const [whiteListMintStartTime, setWhiteListMintStartTime] = useState('1669405362')


  const { ido } = tokenConfig
  const idoContract = new web3.eth.Contract(ido.abi, ido.address)
  console.log(idoContract)

  const Tab = tabs.map((item) => {
    return (
      <div
        className={cx(styles.tab_item, {
          active: tabIndex === item.id
        })}
        key={item.id}
        onClick={() => {
          setShow(false)
          setTabIndex(item.id)
          setShow(true)
        }}
      >
        {item.name}
      </div>
    )
  })

  const TabContent = () => {
    if (tabIndex === 0) {
      return (
        <ul>
          <li>{t('phase1_con1')}</li>
          <li>{t('phase1_con2')}</li>
          <li>{t('phase1_con3')}</li>
          <li>{t('phase1_con4')}</li>
          <li>{t('phase1_con5')}</li>
          <li>{t('phase1_con6')}</li>
        </ul>
      )
    }
    if (tabIndex === 1) {
      return (
        <ul>
          <li>{t('phase1_con3')}</li>
          <li>{t('phase1_con4')}</li>
          <li>{t('phase1_con5')}</li>
          <li>{t('phase1_con6')}</li>
        </ul>
      )
    }
  }

  const initNetWork = async () => {
    let ethereum = window.ethereum
    const data = [{
      chainId: "0x61",
      // chainId: "0x38",
      chainName: "Binance Smart Chain Test Mainnet",
      nativeCurrency: {
        name: "TBNB",
        symbol: "TBNB",
        decimals: 18,
      },
      rpcUrls: ["https://bsc-testnet.public.blastapi.io"],
      blockExplorerUrls: ["https://bscscan.com/"],
    },]

    /* eslint-disable */
    const tx = await ethereum.request({
      method: "wallet_addEthereumChain",
      params: data
    }).catch()
    if (tx) {
      console.log(tx)
    }
  }

  const getPercent = (a,p) =>{
    return (((a * 1) / (p * 1)) * 100).toFixed(2)
  }

  const checkWallet = () => {
      if (!account) {
          confirmAlert({
              customUI: ({ onClose }) => {
                  return (
                      <div className={styles.confirmAlert}>
                          <h1>Please connect wallet</h1>
                          <p className={styles.center}>
                              <button
                                  onClick={() => {
                                      wallet.connect()
                                      onClose()
                                  }}
                              >
                                  OK
                              </button>
                              <button onClick={onClose}>Cancel</button>
                          </p>
                      </div>
                  )
              },
          })
          return true
      }
      return false
  }

  const mint = async()=>{
    if (checkWallet()) return
    await idoContract.methods.publicSaleMint(1, 0).send({
      from: account,
      value: mintNum * publicPrice[round]
    })
  }

  const freemint = async()=>{
    if (checkWallet()) return
    await idoContract.methods.allowlistMint().send({
      from: account
    })
  }

  useEffect(() => {
    initNetWork()
    // setPercent(91) // 设置百分比
    // setExpirydate('2022-11-21') // 设置倒计时日期
    // setUnitPrice(0.15) // 设置单价
    // setPasscard(300)
    // setCirculation(0)

    const timer = setInterval(async () => {
      if (account) {
        const publicPrice1 = utils.formatEther(await idoContract.methods.publicPrice(0).call())
        const publicPrice2 = utils.formatEther(await idoContract.methods.publicPrice(1).call())
        const publicPrice3 = utils.formatEther(await idoContract.methods.publicPrice(2).call())
        const publicPrice4 = utils.formatEther(await idoContract.methods.publicPrice(3).call())
        setPublicPrice([publicPrice1, publicPrice2, publicPrice3, publicPrice4])
        console.log("publicPrice", publicPrice)
        const mintLimit1 = await idoContract.methods.mintLimit(0).call()
        const mintLimit2 = await idoContract.methods.mintLimit(1).call()
        const mintLimit3 = await idoContract.methods.mintLimit(2).call()
        const mintLimit4 = await idoContract.methods.mintLimit(2).call()
        setAlreadyMint([mintLimit1, mintLimit2, mintLimit3, mintLimit4])
        console.log("mintLimit", mintLimit)
        const alreadyMint1 = await idoContract.methods.alreadyMint(0).call()
        const alreadyMint2 = await idoContract.methods.alreadyMint(1).call()
        const alreadyMint3 = await idoContract.methods.alreadyMint(2).call()
        const alreadyMint4 = await idoContract.methods.alreadyMint(2).call()
        setAlreadyMint([alreadyMint1, alreadyMint2, alreadyMint3, alreadyMint4])
        console.log("alreadyMint", alreadyMint)
        const publicSaleStartTime1 = await idoContract.methods.publicSaleStartTime(0).call()
        const publicSaleStartTime2 = await idoContract.methods.publicSaleStartTime(1).call()
        const publicSaleStartTime3 = await idoContract.methods.publicSaleStartTime(2).call()
        const publicSaleStartTime4 = await idoContract.methods.publicSaleStartTime(3).call()
        const publicSaleStartTime5 = await idoContract.methods.publicSaleStartTime(4).call()
        const publicSaleStartTime6 = await idoContract.methods.publicSaleStartTime(5).call()
        setPublicSaleStartTime([
          publicSaleStartTime1, 
          publicSaleStartTime2, 
          publicSaleStartTime3, 
          publicSaleStartTime4, 
          publicSaleStartTime5, 
          publicSaleStartTime6
        ])
        console.log("publicSaleStartTime", publicSaleStartTime)
        const freeMintStartTime = await idoContract.methods.freeMintStartTime().call()
        const whiteListMintStartTime = await idoContract.methods.whiteListMintStartTime().call()
        const whiteListMintEndTime = await idoContract.methods.whiteListMintEndTime().call()
        setExpirydate(freeMintStartTime, publicSaleStartTime1, publicSaleStartTime3, publicSaleStartTime5)
        setWhiteListMintStartTime(whiteListMintStartTime)
        console.log("expirydate", expirydate)
        const freemintNum = await idoContract.methods.allowlist(account).call()
        setFreemintNum(freemintNum)
        const whiteListMintNum = await idoContract.methods.chargeAllowlist(account).call()
        setWhiteListMintNum(whiteListMintNum)
        const tabIndex = await idoContract.methods.getRound().call() * 1
        setTabIndex(tabIndex)
        setRound(tabIndex)
        console.log("group", tabIndex)
      }
      clearInterval(timer)
    }, 3000)
    const windowWidth = document.body.clientWidth
    if (windowWidth <= 600) {
      setSwapCount(1)
    }
    const handleScroll = event => {
      console.log('window.scrollY', window.scrollY)
      // console.log("roadmap", document.getElementById("roadmap").getBoundingClientRect().top)
      console.log("events", event)
    }

    window.addEventListener('scroll', handleScroll)

    //loading
    document.getElementById("loading").classList.add("animate__animated", "animate__fadeOut", "animate__slower")
    setTimeout(() => {
      document.getElementById("loading").classList.add("none")
    }, 100)

    return () => {
      clearInterval(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [account])


  return (
    <HeaderFooter activeIndex={1} scrolling={scrolling}>
      <ToastContainer />
      <div id="loading" className={styles.loading}>
        <i></i>
      </div>
      <video
        className={styles.bg_video}
        autoPlay={true}
        playsInline={true}
        loop={true}
        muted={true}
        poster="/home/cover.jpg"
      >
        <source src="/home/bg_video.mp4" type="video/mp4" />
      </video>
      <main className={styles.mint}>
        <div className={styles.tab_wrap}>
          <div
            className={cx(styles.title, {
              fr: router.locale === 'fr'
            })}
          ></div>
          <div className={styles.tab}>{Tab}</div>
          <div className={styles.tab_content}>{TabContent()}</div>
          <Process percent={getPercent(alreadyMint[tabIndex], mintLimit[tabIndex])} />
        </div>
        <div className={styles.prices}>
          <div className={styles.btns_wrap}>
            <div className={cx(styles.passcard, styles.btn)}>
              <div className={styles.label}>{t('passcard')}</div>
              <div className={styles.val}>
                <span>1650</span>
                <span className={styles.unit}>NFTs</span>
              </div>
            </div>
            <div className={cx(styles.passcard, styles.btn)}>
              <div className={styles.label}>{t('passcard')}</div>
              <div className={styles.val}>
                <span>{mintLimit[tabIndex]}</span>
                <span className={styles.unit}>NFTs</span>
              </div>
            </div>
            <div className={cx(styles.circulation, styles.btn)}>
              <div className={styles.label}>{t('circulation')}</div>
              <div className={styles.val}>
                <span>{alreadyMint[tabIndex]}</span>
                <span className={styles.unit}>NFTs</span>
              </div>
            </div>
            <div className={cx(styles.deadline, styles.btn)}>
              <div className={styles.label}>{t('deadline')}</div>
              <div className={styles.val}>
                {show && <Deadline date={new Date(expirydate[tabIndex]*1000).toDateString()} />}
              </div>
            </div>
          </div>
          {tabIndex != 0 && <div className={styles.mint_wrap}>
            <div>
              <input value={mintNum} onChange={(e)=>{
                setMintNum(e.target.value)
              }} className={styles.mint_input} type="number" min="1" max="10" />
              <div onClick={()=>mint()} className={cx(styles.mint_btn, { fr: router.locale === 'fr' })} ></div>
            </div>
            <div className={styles.unit_price}>
              {t('unit_price')}: {publicPrice[tabIndex]} ETH / NFT
            </div>
            {tabIndex == 1 && parseInt((new Date()).getTime() / 1000) >= whiteListMintStartTime &&  parseInt((new Date()).getTime() / 1000) < publicSaleStartTime[0] &&
              <>
                <span>Mint available: {whiteListMintNum} NFTs</span>
              </>
            }
          </div>
          }
          {
            tabIndex == 0 
            && 
            <div className={styles.freemint}>
              <span>Mint available: {freemintNum} NFTs</span>
              <button onClick={()=>freemint()} className={styles.freemint_btn}></button>
            </div>
          }
          <video
            className={styles.mint_video}
            src="/home/mint.mp4"
            autoPlay={true}
            playsInline={true}
            loop={true}
            muted={true}
            preload="none"
            poster="/home/cover.jpg"
          />
        </div>
      </main>
    </HeaderFooter>
  )
}

export const getStaticProps = async ({
  locale
}) => ({
  props: {
    ...await serverSideTranslations(locale, ['common']),
  },
})

export default withRouter(Mint)
