import React, { useState, useEffect } from "react"
import Wallet from '../components/wallet'
import Link from 'next/link'
import classNames from "classnames/bind"
import styles from "../styles/layout.module.scss"
import Router, {
    useRouter
} from 'next/router'
import {
    useTranslation,
    Trans
} from 'next-i18next'
import { route } from "next/dist/server/router"

const cx = classNames.bind(styles)

const Header = (props) => {
    const { activeIndex, scrolling } = props
    const [openState, setopenState] = useState(false)
  
    const router = useRouter()
    console.log(router);
    const {
        t
    } = useTranslation('common')

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
                if (window.fullpage_api) {
                  window.fullpage_api.moveTo(1, 1000)
                } else {
                  Router.push('/#home')
                }
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
            <Link href={router.route} replace locale="en">
              <span className={cx({ active: router.locale === 'en' })}>EN</span>
            </Link>
            /
            <Link href={router.route} replace locale="fr">
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
          <i
            className={styles.logo}
            onClick={() => {
              setopenState(false)
              window.fullpage_api.moveTo(1, 1000)
            }}
          ></i>
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
                   if (window.fullpage_api) {
                     window.fullpage_api.moveTo(1, 1000)
                   } else {
                     Router.push('/#home')
                   }
                }}
                className={styles.active}
              >
                {t('nav_home')}
              </li>
              <li
                data-menuanchor="about_ffc"
                onClick={() => {
                  if (window.fullpage_api) {
                    window.fullpage_api.moveTo(2, 1000)
                  } else {
                    Router.push('/#about_ffc')
                  }
                }}
              >
                {t('nav_about_FFC')}
              </li>
              <li
                data-menuanchor="football_ambassador"
                onClick={() => {
                   if (window.fullpage_api) {
                     window.fullpage_api.moveTo(3, 1000)
                   } else {
                     Router.push('/#football_ambassador')
                   }
                }}
              >
                {t('nav_football_ambassador')}
              </li>
              <li
                data-menuanchor="roadmap"
                onClick={() => {
                 if (window.fullpage_api) {
                   window.fullpage_api.moveTo(4, 1000)
                 } else {
                   Router.push('/#roadmap')
                 }
                }}
              >
                {t('nav_road_map')}
              </li>
              <li
                data-menuanchor="our_partner"
                onClick={() => {
                  if (window.fullpage_api) {
                    window.fullpage_api.moveTo(5, 1000)
                  } else {
                    Router.push('/#our_partner')
                  }
                }}
              >
                {t('nav_our_partner')}
              </li>
              <li
                data-menuanchor="qa"
                onClick={() => {
                  setopenState(false)
                  if (window.fullpage_api) {
                    window.fullpage_api.moveTo(6, 1000)
                  } else {
                    Router.push('/#our_partner')
                  }
                }}
              >
                {t('nav_qa')}
              </li>
            </ul>
            <dl className={styles.language}>
              <dt>
                <Link href={router.route} replace locale="fr">
                  <span>French</span>
                </Link>
              </dt>
              <dt>
                <Link href={router.route} replace locale="en">
                  <span>English</span>
                </Link>
              </dt>
            </dl>
          </div>

          <div className={styles.wallet}>
              <Wallet />
          </div>
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
