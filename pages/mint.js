import React, { useState, useEffect } from "react"
import styles from "../styles/index.module.scss"
import classNames from "classnames/bind"
import Web3 from "web3"
import useWallet from "use-wallet"
import HeaderFooter from "../layout/HeaderFooter"
import Clipboard from 'react-clipboard.js'
import Process from '../components/process'
import Deadline from '../components/deadline'
import {
    ToastContainer,
} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { withRouter, useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

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
    const [expirydate, setExpirydate] = useState('2023-12-31')

    const Tab = tabs.map((item) => {
      return (
        <div
          className={cx(styles.tab_item, {
            active: tabIndex === item.id
          })}
          key={item.id}
          onClick={() => setTabIndex(item.id)}
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

    useEffect(() => {
        setPercent(91) // 设置百分比
        setExpirydate('2022-11-21') // 设置倒计时日期
        setUnitPrice(1) // 设置单价
        setPasscard(1500)
        setCirculation(500)

        const timer = setInterval(async () => {
            if (account) {

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
            <Process percent={percent} />
          </div>
          <div className={styles.prices}>
            <div className={styles.btns_wrap}>
              <div className={cx(styles.passcard, styles.btn)}>
                <div className={styles.label}>{t('passcard')}</div>
                <div className={styles.val}>
                  <span>{passcard}</span>
                  <span className={styles.unit}>NFTs</span>
                </div>
              </div>
              <div className={cx(styles.circulation, styles.btn)}>
                <div className={styles.label}>{t('circulation')}</div>
                <div className={styles.val}>
                  <span>{circulation}</span>
                  <span className={styles.unit}>NFTs</span>
                </div>
              </div>
              <div className={cx(styles.deadline, styles.btn)}>
                <div className={styles.label}>{t('deadline')}</div>
                <div className={styles.val}>
                  <Deadline date={expirydate} />
                </div>
              </div>
            </div>
            <div className={styles.mint_wrap}>
              <div
                className={cx(styles.mint_btn, {
                  fr: router.locale === 'fr'
                })}
              ></div>
              <div className={styles.unit_price}>
                {t('unit_price')}: {unitPrice} Usdt / NFT
              </div>
            </div>
            <video
              className={styles.mint_video}
              src="/home/bg_video1.mp4"
              controls={true}
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
