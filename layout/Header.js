import React, { useState, useEffect } from "react"
import Wallet from '../components/wallet'
import Link from 'next/link'
import classNames from "classnames/bind"
import styles from "../styles/layout.module.scss"
import {
    useRouter
} from 'next/router'
import {
    useTranslation,
    Trans
} from 'next-i18next'

const cx = classNames.bind(styles)

const Header = (props) => {
    const { activeIndex, scrolling } = props
    const [openState, setopenState] = useState(false)
  
    const router = useRouter()
    const {
        t
    } = useTranslation('common')
    useEffect( () => {
        // initNetWork()
    }, [])    

    const initNetWork = async () => {
        let ethereum = window.ethereum
        const data = [
            {
                // chainId: "0x61",
                chainId: "0x38",
                chainName: "Binance Smart Chain Mainnet",
                nativeCurrency: {
                    name: "BNB",
                    symbol: "BNB",
                    decimals: 18,
                },
                rpcUrls: ["https://bsc-dataseed.binance.org"],
                blockExplorerUrls: ["https://bscscan.com/"],
            },
        ]

        /* eslint-disable */
        const tx = await ethereum.request({ method: "wallet_addEthereumChain", params: data }).catch()
        if (tx) {
            console.log(tx)
        }
    }

    const scrollToAnchor = (anchorName) => {
        if (anchorName) {
            let anchorElement = document.getElementById(anchorName)
            if (anchorElement) {
                anchorElement.scrollIntoView({
                    block: "start",
                    behavior: "smooth"
                })
            }
        }
    }

    return (
      <header className={cx(styles.header, { blue: scrolling })}>
        <div className={cx(styles.volet_menu, { active: openState })}>
          <ul className={styles.menu_wrap}>
            <li
              data-menuanchor="home"
              onClick={() => {
                setopenState(false)
                window.fullpage_api.moveTo(1, 1000)
              }}
              className={styles.active}
            >
              {t('nav_home')}
            </li>
            <li
              data-menuanchor="about_ffc"
              onClick={() => {
                setopenState(false)
                window.fullpage_api.moveTo(2, 1000)
              }}
            >
              {t('nav_about_FFC')}
            </li>
            <li
              data-menuanchor="football_ambassador"
              onClick={() => {
                setopenState(false)
                window.fullpage_api.moveTo(3, 1000)
              }}
            >
              {t('nav_football_ambassador')}
            </li>
            <li
              data-menuanchor="roadmap"
              onClick={() => {
                setopenState(false)
                window.fullpage_api.moveTo(4, 1000)
              }}
            >
              {t('nav_road_map')}
            </li>
            <li
              data-menuanchor="our_partner"
              onClick={() => {
                setopenState(false)
                window.fullpage_api.moveTo(5, 1000)
              }}
            >
              {t('nav_our_partner')}
            </li>
            <li
              data-menuanchor="our_partner"
              onClick={() => {
                setopenState(false)
                window.fullpage_api.moveTo(6, 1000)
              }}
            >
              {t('nav_qa')}
            </li>
          </ul>
          <div className={styles.locale}>
            <Link href="/en" replace locale="en">
              <span className={cx({ active: router.locale === 'en' })}>EN</span>
            </Link>
            /
            <Link href="/fr" replace locale="fr">
              <span className={cx({ active: router.locale === 'fr' })}>FR</span>
            </Link>
          </div>
          <div className={styles.contacts}>
            <div
              className={styles.twitter}
              onClick={() => window.open('https://twitter.com/leagueofffc')}
            ></div>
            <div
              className={styles.discord}
              onClick={() => window.open('https://discord.gg/7YcbauR7xD')}
            ></div>
          </div>
        </div>
        <nav className={styles.navbar}>
          <i className={styles.logo} onClick={() => {
                setopenState(false)
                window.fullpage_api.moveTo(1, 1000)
              }}></i>
          <div
            className={cx(styles.open_menu, { open: openState })}
            onClick={() => {
              setopenState(!openState)
            }}
          >
            <div className={styles.menu_burger}>
              <span></span> <span></span> <span></span>
            </div>
            <span>MENU</span>
          </div>
          <div className={styles.navwrap}>
            <ul id="Menu">
              <li
                data-menuanchor="home"
                onClick={() => {
                  window.fullpage_api.moveTo(1, 1000)
                }}
                className={styles.active}
              >
                {t('nav_home')}
              </li>
              <li
                data-menuanchor="about_ffc"
                onClick={() => {
                  window.fullpage_api.moveTo(2, 1000)
                }}
              >
                {t('nav_about_FFC')}
              </li>
              <li
                data-menuanchor="football_ambassador"
                onClick={() => {
                  window.fullpage_api.moveTo(3, 1000)
                }}
              >
                {t('nav_football_ambassador')}
              </li>
              <li
                data-menuanchor="roadmap"
                onClick={() => {
                  window.fullpage_api.moveTo(4, 1000)
                }}
              >
                {t('nav_road_map')}
              </li>
              <li
                data-menuanchor="our_partner"
                onClick={() => {
                  window.fullpage_api.moveTo(5, 1000)
                }}
              >
                {t('nav_our_partner')}
              </li>
              <li
                data-menuanchor="qa"
                onClick={() => {
                  setopenState(false)
                  window.fullpage_api.moveTo(6, 1000)
                }}
              >
                {t('nav_qa')}
              </li>
            </ul>
            <dl className={styles.language}>
              <dt>
                <Link href="/fr" replace locale="fr">
                  <span>French</span>
                </Link>
              </dt>
              <dt>
                <Link href="/en" replace locale="en">
                  <span>English</span>
                </Link>
              </dt>
            </dl>
          </div>

          {/* <div className={styles.wallet}>
                    <Wallet />
                </div> */}
        </nav>
        {/* <div className={styles.locale}>
          <Link href="#" locale={router.locale === 'en' ? 'zh' : 'en'}>
            {router.locale === 'en' ? 'English' : '中文'}
          </Link>
        </div> */}
        {props.children}
      </header>
    )
}

export default Header
