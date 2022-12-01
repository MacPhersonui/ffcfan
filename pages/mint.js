import React, { useState, useEffect } from "react"
import styles from "../styles/index.module.scss"
import classNames from "classnames/bind"
import Web3 from "web3"
import useWallet from "use-wallet"
import HeaderFooter from "../layout/HeaderFooter"
import Clipboard from 'react-clipboard.js'
import Process from '../components/process'
import Deadline from '../components/deadline'
import { ToastContainer, toast } from 'react-toastify'
 import 'react-toastify/dist/ReactToastify.css'
import { withRouter, useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import tokenConfig from "../contract.config"
import { confirmAlert } from "react-confirm-alert"
import { utils } from "ethers"
import { getIdoData } from '../api/api'

const toastConfig = {
      position: 'bottom-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
    }

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
      name: t('phase1'),
      id: 0
    },
    {
      name: t('phase2'),
      id: 1
    },
    {
      name: t('phase3'),
      id: 2
    },
    {
      name: t('phase4'),
      id: 3
    },
    {
      name: t('phase5'),
      id: 4
    }
  ]
  const web3 = new Web3(ethereum)
  const [swapCount, setSwapCount] = useState(4)
  const [scrolling] = useState(false)
  const [tabIndex, setTabIndex] = useState(0)
  const [advance, setAdvance] = useState(false)
  const [overdue, setOverdue] = useState(false)
  const [expirydate, setExpirydate] = useState(1669305362000)
  const [mintedAccount, setMintedAccount] = useState(0)
  const [publicPrice, setPublicPrice] = useState([
    '0',
    '150000000000000000',
    '250000000000000000',
    '300000000000000000',
    '300000000000000000'
  ])
  const [mintLimit, setMintLimit] = useState([50, 300, 300, 500, 800,])
  const [alreadyMint, setAlreadyMint] = useState([0,0,0,0,0])
  const [publicSaleStartTime, setPublicSaleStartTime] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ])
  const [freemintNum, setFreemintNum] = useState(0)
  const [freemintAmount, setFreemintAmount] = useState(0)
  const [whiteListMintNum, setWhiteListMintNum] = useState(0)
  const [mintNum, setMintNum] = useState(0)
  const [totalSupply, setTotalSupply] = useState(0)

  const { ido } = tokenConfig
  const idoContract = new web3.eth.Contract(ido.abi, ido.address)

  const Tab = tabs.map((item) => {
    return (
      <div
        className={cx(styles.tab_item, {
          active: tabIndex === item.id
        })}
        key={item.id}
        onClick={()=> {
          switchPhase(item)
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
  const getDate = ()=> {
      if (advance) {
        return <div className={styles.dateStauts}>Not Started！</div>
      }
      if (overdue) {
        return <div className={styles.dateStauts}>Expired！</div>
      }
      return <Deadline timestamp={expirydate} />
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
  const switchPhase = ({ id }) => {
    setTabIndex(id)
    const startTime = publicSaleStartTime[id * 2] * 1000
    const endTime = publicSaleStartTime[id * 2 + 1] * 1000
    if (Date.now() >= startTime && Date.now() <= endTime) {
      setExpirydate(endTime)
    }
    setAdvance(Date.now() < startTime)
    setOverdue(Date.now() > endTime)
  }
  const getPercent = (a, p) =>{
    return (((a * 1) / (p * 1)) * 100).toFixed(2)
  }
  const checkWallet = () => {
      if (!account) {
          confirmAlert({
              customUI: ({ onClose }) => {
                  return (
                    <div className="custom-alert-ui">
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

  const mint = async()=> {
    
    if (checkWallet()) return
    if (!getInornotPhase()) return
    if (mintNum * 1 + mintedAccount * 1 > 10) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-alert-ui">
              <h1>Your mint quantity exceeds the upper limit 10 ！</h1>
              <p className={styles.center}>
                <button onClick={onClose}>Ok</button>
              </p>
            </div>
          )
        }
      })
      return
    }
    if (tabIndex === 1) {
       await idoContract.methods.allowChargelistMint(mintNum, 0).send({
         from: account,
         value: mintNum * publicPrice[1]
       })
       toast.success('mint success!', toastConfig)
    } else {
       await idoContract.methods.publicSaleMint(mintNum, 0).send({
         from: account,
         value: mintNum * publicPrice[tabIndex]
       })
       toast.success('mint success!', toastConfig)
    }
   
  }

  const freemint = async()=>{
    if (checkWallet()) return
    if (freemintNum * 1 === 0) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="custom-alert-ui">
              <h1>You can not freemint because of you can Mint available is 0!</h1>
              <p className={styles.center}>
                <button onClick={onClose}>Ok</button>
              </p>
            </div>
          )
        }
      })
      return
    }
     if (mintNum * 1 + mintedAccount * 1 > 10) {
       confirmAlert({
         customUI: ({ onClose }) => {
           return (
             <div className="custom-alert-ui">
               <h1>Your mint quantity exceeds the upper limit 10 ！</h1>
               <p className={styles.center}>
                 <button onClick={onClose}>Ok</button>
               </p>
             </div>
           )
         }
       })
       return
     }
    if (!getInornotPhase()) return
    await idoContract.methods.allowlistMint(freemintAmount, 0).send({
      from: account
    })
    toast.success('mint success!', toastConfig)
  }
  const getInornotPhase = ()=> {
    const now = Date.now() / 1000
    const start = publicSaleStartTime[tabIndex * 2]
    const end = publicSaleStartTime[tabIndex * 2 + 1] 
    console.log(start)
    console.log(now)
    console.log(end)
    return now > start && now < end
  }
  const getTabindex = (times) => {
    const now = Date.now() / 1000
    let tabIndex = 0
    for (let index = 0; index <= times.length; index++) {
      if (now < times[index] * 1) {
        if (index%2 === 0) {
          tabIndex =  index / 2 - 1
        } else {
          tabIndex = (index + 1) / 2 - 1
        }
      }
    }
    // 因为白单mint 和第三阶段同时开始，需要根据白单mint数量判断具体在哪一阶段
    if (tabIndex === 1) {
      if (whiteListMintNum === 0) {
        tabIndex = 2
      }
    }
    return tabIndex
  }

  useEffect(() => {
    initNetWork()
    const initData = async()=> {
      const data = await getIdoData()
      const {
        alreadyMint,
        publicSaleStartTime,
        totalSupply,
      } = data
       setAlreadyMint(alreadyMint)
       setPublicSaleStartTime(publicSaleStartTime)
       console.log(publicSaleStartTime)
       setTotalSupply(totalSupply)
       console.log(123432432432)
       setExpirydate(publicSaleStartTime[0] * 1000)
    }
    initData()
    const timer = setInterval(async () => {
      if (account) {
        const freemintNum = await idoContract.methods.allowlist(account).call()
        setFreemintNum(freemintNum)
        const mintedAccount = await idoContract.methods
          .numberMinted(account)
          .call()
        setMintedAccount(mintedAccount)
        const whiteListMintNum = await idoContract.methods.chargeAllowlist(account).call()
        setWhiteListMintNum(whiteListMintNum)
        const limitPromise = [], pricePromise = [], mintedPromise = [], timePromise = []
        for (let index = 0; index < 5; index++) {
          limitPromise.push(idoContract.methods.mintLimit(index).call())
          pricePromise.push(idoContract.methods.publicPrice(index).call())
          mintedPromise.push(idoContract.methods.alreadyMint(index).call())
        }
        for (let index = 0; index < 10; index++) {
          timePromise.push(
            idoContract.methods.publicSaleStartTime(index).call()
          )
        }
        const mintLimit = await Promise.all(limitPromise)
        setMintLimit(mintLimit)
        const publicPrice = await Promise.all(pricePromise)
        setPublicPrice(publicPrice)
        const alreadyMint = await Promise.all(mintedPromise)
        setAlreadyMint(alreadyMint)
        const publicSaleStartTime = await Promise.all(timePromise)
        setPublicSaleStartTime(publicSaleStartTime)
    
        // setExpirydate(publicSaleStartTime[0] * 1000)
        const totalSupply = await idoContract.methods.totalSupply().call()
        setTotalSupply(totalSupply)
      }
      clearInterval(timer)
    }, 1000)
    switchPhase({ id: getTabindex(publicSaleStartTime) })
    const windowWidth = document.body.clientWidth
    if (windowWidth <= 600) {
      setSwapCount(1)
    }
    //loading
    document.getElementById("loading").classList.add("animate__animated", "animate__fadeOut", "animate__slower")
    setTimeout(() => {
      document.getElementById("loading").classList.add("none")
    }, 100)

    return () => {
      clearInterval(timer)
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
          <Process percent={getPercent(totalSupply, 1650)} />
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
              <div className={styles.val}>{getDate()}</div>
            </div>
          </div>
          {tabIndex != 0 && (
            <div className={styles.mint_wrap}>
              <div className={styles.input_wrap}>
                <input
                  value={mintNum}
                  onChange={(e) => {
                    setMintNum(e.target.value)
                  }}
                  className={styles.mint_input}
                  type="number"
                  disabled={false}
                  min="1"
                  max="10"
                />
                <div
                  onClick={() => mint()}
                  className={cx(
                    styles.mint_btn,
                    {
                      disable: !getInornotPhase()
                    },
                    {
                      fr: router.locale === 'fr'
                    }
                  )}
                ></div>
              </div>
              <div className={styles.unit_price}>
                {t('unit_price')}:{' '}
                {Number(utils.formatEther(publicPrice[tabIndex]))} ETH / NFT
              </div>
              {tabIndex === 1 &&
                Date.now() >= publicSaleStartTime[2] * 1000 &&
                Date.now() < publicSaleStartTime[3] * 1000 && (
                  <>
                    <span className={styles.mintTip}>
                      Mint available: {whiteListMintNum} NFTs
                    </span>
                  </>
                )}
            </div>
          )}
          {tabIndex == 0 && (
            <div className={styles.freemint}>
              <div className={styles.input_wrap}>
                <input
                  type="number"
                  min="0"
                  max={freemintNum}
                  value={freemintAmount}
                  onChange={(e) => {
                    setFreemintAmount(e.target.value)
                  }}
                />
                <button
                  onClick={() => freemint()}
                  className={cx(
                    styles.freemint_btn,
                    {
                      disable: !getInornotPhase()
                    },
                    {
                      fr: router.locale === 'fr'
                    }
                  )}
                ></button>
              </div>
              <div className={styles.mintTip}>
                Mint available: {freemintNum} NFTs
              </div>
            </div>
          )}
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
