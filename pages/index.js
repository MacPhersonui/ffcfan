import React, { useState, useEffect } from "react"
import Head from "next/head"
import Image from "next/image"
import styles from "../styles/index.module.scss"
import classNames from "classnames/bind"
import Timer from "react-compound-timer"
import Web3 from "web3"
import Wallet from "../components/wallet"
import useWallet from "use-wallet"
import {
    getInvite,
    getInviteRank,
    createInvite
} from "../api/api"
import tokenConfig from "../contract.config"
import { confirmAlert } from "react-confirm-alert"
import HeaderFooter from "../layout/HeaderFooter"
import Clipboard from 'react-clipboard.js'
import {
    ToastContainer,
    toast
} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { withRouter, useRouter } from 'next/router'
import {
    useTranslation,
    Trans
} from 'next-i18next'
import {
    serverSideTranslations
} from 'next-i18next/serverSideTranslations'
import Cookies from 'js-cookie'
import {
    utils
} from "ethers"
import {
    Swiper,
    SwiperSlide
} from "swiper/react"

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import {
    Navigation,
    Pagination,
    Keyboard,
    FreeMode,
    Thumbs,
    Autoplay,
    EffectCoverflow,
    EffectCards
} from "swiper"
import 'animate.css'
import ReactFullpage from '@fullpage/react-fullpage'
const cx = classNames.bind(styles)

const toastConfig = {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: null,
    pauseOnHover: false,
}


const Home = () => {
    const {
        t
    } = useTranslation('common')
     const router = useRouter()
    const wallet = useWallet()
    const {
        account,
        ethereum
    } = wallet

    const web3 = new Web3(ethereum)
    const [swapCount, setSwapCount] = useState(4)
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const [thumbsSwiper2, setThumbsSwiper2] = useState(null)
    const [qaActive, setQaActive] = useState(1)
    const [scrolling, setScrolling] = useState(false)
    useEffect(() => {
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
        }, 2000)


        return () => {
            clearInterval(timer)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [account])

    const afterLoad = (origin, destination, direction, trigger) => {
        console.log("afterLoad", origin, destination, direction, trigger)
        console.log(origin.index)
        setScrolling(false)
        if (origin.index == 0) {
            document.getElementById("solgen_logo").classList.add("animate__animated", "animate__fadeInLeft", "animate__fast", "animate__delay-2s")
            document.getElementById("solgen_title").classList.add("animate__animated", "animate__fadeInLeft", "animate__fast", "animate__delay-3s")
            document.getElementById("solgen_subtitle").classList.add("animate__animated", "animate__fadeInLeft", "animate__fast", "animate__delay-3s")
            document.getElementById("solgen_team").classList.add("animate__animated", "animate__fadeInLeft", "animate__fast", "animate__delay-3s")
            document.getElementById("solgen_video").classList.add("animate__animated", "animate__fadeInRight", "animate__fast", "animate__delay-2s")
        }
    }

    const onLeave = (section, origin, destination, direction) => {
      setScrolling(true)
      console.log("onLeave", section, origin, destination, direction)
    }


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
        <main className={styles.container}>
          <ReactFullpage
            //fullpage options
            licenseKey={'YOUR_KEY_HERE'}
            scrollingSpeed={1000} /* Options here */
            afterLoad={afterLoad}
            onLeave={onLeave}
            anchors={[
              'home',
              'about_ffc',
              'football_ambassador',
              'roadmap',
              'our_partner',
              'qa'
            ]}
            menu="#Menu"
            render={({ state, fullpageApi }) => {
              return (
                <ReactFullpage.Wrapper>
                  <div className={styles.solgen + ' section content-item'}>
                    <div className={styles.solgen_content}>
                      <i>
                        {t('build_the_first_league')}
                        {t('in_the_web3_world')} {t('build_the_first_league')}{' '}
                        {t('in_the_web3_world')} {t('build_the_first_league')}{' '}
                        {t('in_the_web3_world')}
                      </i>
                      <div className={styles.text}>
                        <div
                          id="solgen_logo"
                          className={styles.solgen_logo}
                        ></div>
                        <h1 id="solgen_title">
                          <p>{t('ffc')}</p>
                          <p>{t('to_web3')}</p>
                        </h1>
                        <h2 id="solgen_subtitle">
                          {t('build_the_first_league')}
                          {t('in_the_web3_world')}
                        </h2>
                      </div>
                      <div id="solgen_team" className={styles.team}>
                        <Swiper
                          slidesPerView={7}
                          spaceBetween={10}
                          pagination={{
                            clickable: true
                          }}
                          autoplay={{
                            delay: 2500,
                            disableOnInteraction: false
                          }}
                          modules={[Autoplay, Pagination]}
                          className={styles.team_swiper}
                        >
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                          <SwiperSlide
                            className={styles.team_list}
                          ></SwiperSlide>
                        </Swiper>
                      </div>
                    </div>
                    <div className={styles.video}>
                      <div id="solgen_video" className={styles.video_warpper}>
                        <Swiper
                          style={{
                            '--swiper-navigation-color': '#fff',
                            '--swiper-pagination-color': '#fff'
                          }}
                          loop={true}
                          spaceBetween={10}
                          speed={300}
                          thumbs={{ swiper: thumbsSwiper }}
                          modules={[FreeMode, Navigation, Thumbs]}
                          className="mySwiper2"
                        >
                          <SwiperSlide className={styles.swiper_silde}>
                            {/* <iframe width="100%" height="100%" src="https://www.youtube.com/embed/1WJhn7Ih7v8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe> */}
                            <video
                              src="/home/bg_video1.mp4"
                              controls={true}
                              autoPlay={true}
                              playsInline={true}
                              loop={true}
                              muted={true}
                              preload="none"
                              poster="/home/cover.jpg"
                            />
                          </SwiperSlide>
                          {/* <SwiperSlide className={styles.swiper_silde}>
                                                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/1WJhn7Ih7v8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                                                </SwiperSlide>
                                                <SwiperSlide className={styles.swiper_silde}>
                                                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/1WJhn7Ih7v8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                                                </SwiperSlide>
                                                <SwiperSlide className={styles.swiper_silde}>
                                                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/1WJhn7Ih7v8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                                                </SwiperSlide> */}
                        </Swiper>
                        {/* <Swiper
                                                onSwiper={setThumbsSwiper}
                                                // loop={true}
                                                spaceBetween={10}
                                                slidesPerView={4}
                                                freeMode={true}
                                                watchSlidesProgress={true}
                                                modules={[FreeMode, Navigation, Thumbs]}
                                                className="mySwiper"
                                            >
                                                <SwiperSlide className={styles.swiper_silde_thumbs}>
                                                    <Image src="/home/imgs.jpeg" layout='fill' />
                                                </SwiperSlide>
                                                <SwiperSlide className={styles.swiper_silde_thumbs}>
                                                    <Image src="/home/imgs.jpeg" layout='fill' />
                                                </SwiperSlide>
                                                <SwiperSlide className={styles.swiper_silde_thumbs}>
                                                    <Image src="/home/imgs.jpeg" layout='fill' />
                                                </SwiperSlide>
                                                <SwiperSlide className={styles.swiper_silde_thumbs}>
                                                    <Image src="/home/imgs.jpeg" layout='fill' />
                                                </SwiperSlide>
                                            </Swiper> */}
                      </div>
                    </div>
                  </div>
                  <div className={styles.what_is_ffc + ' section content-item'}>
                    <i className={styles.flag}>
                      {t('about_ffc')} {t('about_ffc')} {t('about_ffc')}{' '}
                      {t('about_ffc')} {t('about_ffc')} {t('about_ffc')}{' '}
                      {t('about_ffc')} {t('about_ffc')} {t('about_ffc')}{' '}
                      {t('about_ffc')}
                    </i>
                    <div
                      className={cx(styles.title, {
                        fr: router.locale === 'fr'
                      })}
                    ></div>
                    <div className={styles.content}>
                      <Swiper
                        style={{
                          '--swiper-navigation-color': '#fff',
                          '--swiper-pagination-color': '#fff'
                        }}
                        speed = {500}
                        loop={true}
                        spaceBetween={10}
                        thumbs={{ swiper: thumbsSwiper2 }}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper2"
                      >
                        <SwiperSlide className={styles.swiper_silde}>
                          {t('what_is_ffc_content')}
                        </SwiperSlide>
                        <SwiperSlide className={styles.swiper_silde}>
                          {t('ffc_token_content')}
                        </SwiperSlide>
                        <SwiperSlide className={styles.swiper_silde}>
                          {t('ffc_nft_content')}
                        </SwiperSlide>
                        <SwiperSlide className={styles.swiper_silde}>
                          {t('ffc_gamefi_content')}
                        </SwiperSlide>
                      </Swiper>
                      <Swiper
                        onSwiper={setThumbsSwiper2}
                        // loop={true}
                        spaceBetween={30}
                        slidesPerView={4}
                        freeMode={true}
                        speed={300}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="mySwiper"
                      >
                        <SwiperSlide className={styles.swiper_silde_thumbs}>
                          <span />
                          <i>{t('what_is_ffc')}</i>
                        </SwiperSlide>
                        <SwiperSlide className={styles.swiper_silde_thumbs}>
                          <span />
                          <i>{t('ffc_token')}</i>
                        </SwiperSlide>
                        <SwiperSlide className={styles.swiper_silde_thumbs}>
                          <span />
                          <i>{t('ffc_nft')}</i>
                        </SwiperSlide>
                        <SwiperSlide className={styles.swiper_silde_thumbs}>
                          <span />
                          <i>{t('ffc_gamefi')}</i>
                        </SwiperSlide>
                      </Swiper>
                    </div>
                  </div>
                  <div
                    className={
                      styles.football_ambassador + ' section content-item'
                    }
                  >
                    <i className={styles.flag}>
                      {t('football_ambassador')} {t('football_ambassador')}{' '}
                      {t('football_ambassador')} {t('football_ambassador')}{' '}
                      {t('football_ambassador')} {t('football_ambassador')}{' '}
                      {t('football_ambassador')}
                    </i>
                    <div
                      className={cx(styles.title, {
                        fr: router.locale === 'fr'
                      })}
                    ></div>
                    <div className={styles.content}>
                      <Swiper
                       style={{
                            '--swiper-navigation-color': '#fff',
                            '--swiper-pagination-color': '#fff'
                          }}
                        effect={'cards'}
                        grabCursor
                        className="card"
                        loop
                        navigation
                        autoplay={{
                          delay: 5000,
                          disableOnInteraction: false
                        }}
                        cardsEffect={{
                          slideShadows: false
                        }}
                        modules={[EffectCards, Autoplay, Navigation]}
                      >
                        <SwiperSlide className={styles.player + ' player'}>
                          <Image
                            src="https://www.ffcfan.com/home/player_1.png"
                            alt="Landscape picture"
                            width={430}
                            height={600}
                            className={styles.play_img}
                            // placeholder="blur"
                          />
                          <div className={styles.player_info}>
                            <h1>{t('lucas_hernández')}</h1>
                            <div className={styles.intro_wrap}>
                              <p>{t('lucas_hernández_content1')}</p>
                              <p>{t('lucas_hernández_content2')}</p>
                              {/* <p>{t('lucas_hernández_content3')}</p> */}
                              {/* <p>{t('lucas_hernández_content4')}</p> */}
                            </div>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide className={styles.player + ' player'}>
                          <Image
                            src="https://www.ffcfan.com/home/player_2.png"
                            alt="Landscape picture"
                            width={430}
                            height={600}
                            className={styles.play_img}
                            // placeholder="blur"
                          />
                          <div className={styles.player_info}>
                            <h1>{t('achraf_hakimi')}</h1>
                            <div className={styles.intro_wrap}>
                              <p>{t('achraf_hakimi_content1')}</p>
                            </div>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide className={styles.player + ' player'}>
                          <Image
                            src="https://www.ffcfan.com/home/player_3.png"
                            alt="Landscape picture"
                            width={430}
                            height={600}
                            className={styles.play_img}
                            // placeholder="blur"
                          />
                          <div className={styles.player_info}>
                            <h1>{t('marco_verratti')}</h1>
                            <div className={styles.intro_wrap}>
                              <p>{t('marco_verratti_content1')}</p>
                              <p>{t('marco_verratti_content2')}</p>
                            </div>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide className={styles.player + ' player'}>
                          <Image
                            src="https://www.ffcfan.com/home/player_4.png"
                            alt="Landscape picture"
                            width={430}
                            height={600}
                            className={styles.play_img}
                            // placeholder="blur"
                          />
                          <div className={styles.player_info}>
                            <h1>{t('gianluigi_donnarumma')}</h1>
                            <div className={styles.intro_wrap}>
                              <p>{t('gianluigi_donnarumma_content1')}</p>
                            </div>
                          </div>
                        </SwiperSlide>
                        <SwiperSlide className={styles.player + ' player'}>
                          <Image
                            src="https://www.ffcfan.com/home/player_5.png"
                            alt="Landscape picture"
                            width={430}
                            height={600}
                            className={styles.play_img}
                            // placeholder="blur"
                          />
                          <div className={styles.player_info}>
                            <h1>{t('brecht_dejaegere')}</h1>
                            <div className={styles.intro_wrap}>
                              <p>{t('brecht_dejaegere_content1')}</p>
                            </div>
                          </div>
                        </SwiperSlide>
                      </Swiper>
                    </div>
                  </div>
                  <div className={styles.roadmap + ' section content-item'}>
                    <i className={styles.flag}>
                      {t('roadmap')} {t('roadmap')} {t('roadmap')}{' '}
                      {t('roadmap')} {t('roadmap')} {t('roadmap')}{' '}
                      {t('roadmap')}{' '}
                    </i>
                    <div
                      className={cx(styles.title, {
                        fr: router.locale === 'fr'
                      })}
                    ></div>
                    <div className={styles.content}>
                      <ul>
                        <li>
                          <h1>{t('roadmap_time1')}</h1>
                          <h2>{t('roadmap_time1_content1')}</h2>
                        </li>
                        <li>
                          <h1>{t('roadmap_time2')}</h1>
                          <h2>{t('roadmap_time2_content1')}</h2>
                        </li>
                        <li>
                          <h1>{t('roadmap_time3')}</h1>
                          <h2>{t('roadmap_time3_content1')}</h2>
                          <h2>{t('roadmap_time3_content2')}</h2>
                        </li>
                        <li>
                          <h1>{t('roadmap_time4')}</h1>
                          <h2>{t('roadmap_time4_content1')}</h2>
                        </li>
                        <li>
                          <h1>{t('roadmap_time5')}</h1>
                          <h2>{t('roadmap_time5_content1')}</h2>
                        </li>
                        <li>
                          <h1>{t('roadmap_time6')}</h1>
                          <h2>{t('roadmap_time6_content1')}</h2>
                        </li>
                        <li>
                          <h1>{t('roadmap_time7')}</h1>
                          <h2>{t('roadmap_time7_content1')}</h2>
                          <h2>{t('roadmap_time7_content2')}</h2>
                        </li>
                        <li>
                          <h1>{t('roadmap_time8')}</h1>
                          <h2>{t('roadmap_time8_content1')}</h2>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className={styles.partner + ' section content-item'}>
                    <i className={styles.flag}>
                      {t('our_partner')} {t('our_partner')} {t('our_partner')}{' '}
                      {t('our_partner')} {t('our_partner')} {t('our_partner')}{' '}
                      {t('our_partner')}{' '}
                    </i>
                    <div
                      className={cx(styles.title, {
                        fr: router.locale === 'fr'
                      })}
                    ></div>
                    <div className={styles.content}>
                      <Swiper
                       style={{
                            '--swiper-navigation-color': '#fff',
                            '--swiper-pagination-color': '#fff'
                          }}
                        // loop={true}
                        slidesPerView={swapCount === 1 ? 1 : 5}
                        spaceBetween={10}
                        navigation
                        modules={[Navigation, Pagination, Keyboard]}
                        className={styles.outer}
                      >
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                        <SwiperSlide className={styles.inner}></SwiperSlide>
                      </Swiper>
                    </div>
                  </div>
                  <div className={styles.qa + ' section content-item'}>
                    <i className={styles.flag}>
                      {t('our_partner')} {t('our_partner')} {t('our_partner')}{' '}
                      {t('our_partner')} {t('our_partner')} {t('our_partner')}{' '}
                      {t('our_partner')}{' '}
                    </i>
                    <div className={styles.title}>
                      <i></i>
                    </div>
                    <div className={styles.content}>
                      <ul>
                        <li
                          className={cx({ active: qaActive == 1 })}
                          onClick={() => {
                            setQaActive(1)
                          }}
                        >
                          <i>Q1</i>
                          <h1>{t('q1_q')}</h1>
                          <p>{t('q1_a')}</p>
                        </li>
                        <li
                          className={cx({ active: qaActive == 2 })}
                          onClick={() => {
                            setQaActive(2)
                          }}
                        >
                          <i>Q2</i>
                          <h1>{t('q2_q')}</h1>
                          <p>{t('q2_a')}</p>
                        </li>
                        <li
                          className={cx({ active: qaActive == 3 })}
                          onClick={() => {
                            setQaActive(3)
                          }}
                        >
                          <i>Q3</i>
                          <h1>{t('q3_q')}</h1>
                          <p>{t('q3_a')}</p>
                          <p style={{ marginTop: '2vh' }}>{t('q3_a1')}</p>
                          <p>{t('q3_a2')}</p>
                          <p>{t('q3_a3')}</p>
                          <p>{t('q3_a4')}</p>
                          <p>{t('q3_a5')}</p>
                          <p>{t('q3_a6')}</p>
                          <p>{t('q3_a7')}</p>
                          <p style={{ marginTop: '2vh' }}>{t('q3_a8')}</p>
                          <p>{t('q3_a9')}</p>
                          <p>{t('q3_a10')}</p>
                          <p>{t('q3_a11')}</p>
                          <p>{t('q3_a12')}</p>
                          <p>{t('q3_a13')}</p>
                          <p>{t('q3_a14')}</p>
                        </li>
                        <li
                          className={cx({ active: qaActive == 4 })}
                          onClick={() => {
                            setQaActive(4)
                          }}
                        >
                          <i>Q4</i>
                          <h1>{t('q4_q')}</h1>
                          <p>{t('q4_a')}</p>
                          <p style={{ marginTop: '2vh' }}>{t('q3_a1')}</p>
                          <p>{t('q4_a2')}</p>
                          <p>{t('q4_a3')}</p>
                          <p>{t('q4_a4')}</p>
                          <p>{t('q4_a5')}</p>
                          <p>{t('q4_a6')}</p>
                          <p>{t('q4_a7')}</p>
                          <p style={{ marginTop: '2vh' }}>{t('q4_a8')}</p>
                          <p>{t('q4_a9')}</p>
                          <p>{t('q4_a10')}</p>
                          <p>{t('q4_a11')}</p>
                          <p>{t('q4_a12')}</p>
                          <p>{t('q4_a13')}</p>
                          <p>{t('q4_a14')}</p>
                        </li>
                        <li
                          className={cx({ active: qaActive == 5 })}
                          onClick={() => {
                            setQaActive(5)
                          }}
                        >
                          <i>Q5</i>
                          <h1>{t('q5_q')}</h1>
                          <p>{t('q5_a')}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </ReactFullpage.Wrapper>
              )
            }}
          />
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

export default withRouter(Home)
