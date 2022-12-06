import React, { useState, useEffect } from "react"
// @ts-ignore
import Head from "next/head"
// @ts-ignore
import Image from "next/image"
import styles from "../styles/index.module.scss"
import classNames from "classnames/bind"
// @ts-ignore
import Timer from "react-compound-timer"
import Web3 from "web3"
// @ts-ignore
import Wallet from "../components/wallet"
import useWallet from "use-wallet"
// @ts-ignore
import {
    getInvite,
    getInviteRank,
    createInvite
} from "../api/api"
// @ts-ignore
import tokenConfig from "../contract.config"
// @ts-ignore
import { confirmAlert } from "react-confirm-alert"
import HeaderFooter from "../layout/HeaderFooter"
// @ts-ignore
import Clipboard from 'react-clipboard.js'
import {
    ToastContainer,
    // @ts-ignore
    toast
} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
    withRouter
} from "next/router"
import {
    useTranslation,
    // @ts-ignore
    Trans
} from 'next-i18next'
import {
    serverSideTranslations
} from 'next-i18next/serverSideTranslations'
// @ts-ignore
import Cookies from 'js-cookie'
// @ts-ignore
import {
    utils
} from "ethers"
import {
    Swiper,
    SwiperSlide
} from "swiper/react"

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


// import required modules
import {
    Navigation,
    Pagination,
    Keyboard
} from "swiper"
import 'animate.css'

// @ts-ignore
const cx = classNames.bind(styles)

// @ts-ignore
const toastConfig = {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    draggable: true,
    progress: null,
    pauseOnHover: false,
}


// @ts-ignore
const Home = ({
    router
}) => {

    const {
        t
    } = useTranslation('common')

    // @ts-ignore
    const wallet = useWallet()
    const {
        account,
        ethereum
    } = wallet

    // @ts-ignore
    const web3 = new Web3(ethereum)
    const [swapCount, setSwapCount] = useState(4)


   

    useEffect(() => {
        const timer = setInterval(async () => {
            if (account) {

            }
            clearInterval(timer)
        }, 3000)


        const windowWidth = document.body.clientWidth
        if (windowWidth <= 500) {
            setSwapCount(1)
        }
        // @ts-ignore
        const handleScroll = event => {
            console.log('window.scrollY', window.scrollY)
            // @ts-ignore
            console.log("roadmap", document.getElementById("roadmap").getBoundingClientRect().top)
            // @ts-ignore
            if (document.getElementById("ffc").getBoundingClientRect().top < 250) {
                // @ts-ignore
                console.log("ffc", document.getElementById("ffc").getBoundingClientRect().top)
                
                // @ts-ignore
                document.querySelector("#ffc_title p").classList.add("animate__animated", "animate__fadeIn", "animate__slow")
                // @ts-ignore
                document.querySelector("#ffc_title h1").classList.add("animate__animated", "animate__fadeIn", "animate__slow")
                // @ts-ignore
                document.querySelector("#ffc_title h2").classList.add("animate__animated", "animate__fadeIn", "animate__slow")
                document.querySelectorAll("#ffc ul li")[0].classList.add("animate__animated", "animate__fadeIn", "animate__slow", "animate__delay-1s")
                document.querySelectorAll("#ffc ul li")[1].classList.add("animate__animated", "animate__fadeIn", "animate__slow", "animate__delay-2s")
                document.querySelectorAll("#ffc ul li")[2].classList.add("animate__animated", "animate__fadeIn", "animate__slow", "animate__delay-3s")
            }
            // @ts-ignore
            if (document.getElementById("nft").getBoundingClientRect().top < 300) {
                // @ts-ignore
                console.log("nft", document.getElementById("nft").getBoundingClientRect().top)
                console.log(document.querySelectorAll("#nft ul li")[1])
                document.querySelectorAll("#nft>ul>li")[0].classList.add("animate__animated", "animate__fadeIn", "animate__slow")
                document.querySelectorAll("#nft>ul>li")[1].classList.add("animate__animated", "animate__fadeIn", "animate__slow", "animate__delay-1s")
            }
            // @ts-ignore
            if (document.getElementById("roadmap").getBoundingClientRect().top < 300) {
                // @ts-ignore
                console.log("roadmap", document.getElementById("roadmap").getBoundingClientRect().top)
                document.querySelectorAll("#roadmap ul li")[0].classList.add("animate__animated", "animate__fadeIn", "animate__slow")
                document.querySelectorAll("#roadmap ul li")[1].classList.add("animate__animated", "animate__fadeIn", "animate__slow", "animate__delay-1s")
                document.querySelectorAll("#roadmap ul li")[2].classList.add("animate__animated", "animate__fadeIn", "animate__slow", "animate__delay-2s")
                document.querySelectorAll("#roadmap ul li")[3].classList.add("animate__animated", "animate__fadeIn", "animate__slow", "animate__delay-3s")
                document.querySelectorAll("#roadmap ul li")[4].classList.add("animate__animated", "animate__fadeIn", "animate__slow", "animate__delay-4s")
                document.querySelectorAll("#roadmap ul li")[5].classList.add("animate__animated", "animate__fadeIn", "animate__slow", "animate__delay-5s")
                document.querySelectorAll("#roadmap ul li")[6].classList.add("animate__animated", "animate__fadeIn", "animate__slow", "animate__delay-6s")
                document.querySelectorAll("#roadmap ul li")[7].classList.add("animate__animated", "animate__fadeIn", "animate__slow", "animate__delay-7s")
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            clearInterval(timer)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [account])


    return (
        <HeaderFooter activeIndex={1}>
            <ToastContainer />
            <main className={styles.container}>
                <section className={styles.solgen}>
                    <div className={styles.player_left+ " animate__bounceInLeft animate__animated animate__slow"}>
                    </div>
                    <div className={styles.player_left_shadow1 }></div>
                    <div className={styles.player_left_shadow2}></div>
                    <div className={styles.player_right + " animate__bounceInRight animate__animated animate__slow"}></div>
                    <div className={styles.player_right_shadow1 }></div>
                    <div className={styles.player_right_shadow2}></div>
                    <div className={styles.solgen_bottom_bg}></div>
                    <div className={styles.solgen_title+ " animate__zoomInDown animate__animated animate__slow"}>
                        <p>{t('ffc')}</p>
                        <p>{t('to_web3')}</p>
                    </div>
                    <div className={styles.solgen_subtitle + " animate__zoomInUp animate__animated animate__slow"}>
                        <p>{t('build_the_first_league')}</p>
                        <p>{t('in_the_web3_world')}</p>
                    </div>
                    <div className={styles.solgen_logo}></div>
                    <div className={styles.solgen_token1}></div>
                    <div className={styles.solgen_token2}></div>
                    <button>Go to IEO</button>
                </section>
                <section id="ffc" className={styles.what_is_ffc}>
                    <div id="ffc_title" className={styles.title}>
                        <h1>{t('what_is_ffc')}</h1>
                        <h2>{t('what_is_ffc')}</h2>
                        <p>{t('what_is_ffc_content')}</p>
                    </div>
                    <ul className={styles.list}>
                        <li>
                            <span className={
                                styles.cover
                            }></span>
                            <span className={styles.content}>
                                <h1>{t('ffc_token')}</h1>
                                <p>{t('ffc_token_content')}</p>
                            </span>
                        </li>
                        <li>
                            <span className={
                                styles.cover
                            }></span>
                            <span className={styles.content}>
                                <h1>{t('ffc_nft')}</h1>
                                <p>{t('ffc_nft_content')}</p>
                            </span>
                        </li>
                        <li>
                            <span className={
                                styles.cover
                            }></span>
                            <span className={styles.content}>
                                <h1>{t('ffc_gamefi')}</h1>
                                <p>{t('ffc_gamefi_content')} </p>
                            </span>
                        </li>
                    </ul>
                </section>
                <section className={styles.the_best}>
                    <h1>{t('ffc_football_ambassador')}</h1>
                    <ul>
                        <li>
                            <span className={styles.cover}>
                                <video src="/imgs/Zakaria_Aboukhlal.mp4" muted={true} playsInline={true} autoPlay={true} loop={true}></video>
                            </span>
                            <h1>{t("gianluigi_donnarumma")}</h1>
                            <p>{t("gianluigi_donnarumma_content1")}</p>
                        </li>
                        <li>
                            <span className={styles.cover}>
                                <video src="/imgs/Ado_Onaiwu.mp4" muted={true} playsInline={true} autoPlay={true} loop={true}></video>
                            </span>
                            <h1>{t("achraf_hakimi")}</h1>
                            <p>{t("achraf_hakimi_content1")}</p>
                        </li>
                        <li>
                            <span className={styles.cover}>
                                <video src="/imgs/Florian_Sotoca.mp4" muted={true} playsInline={true} autoPlay={true} loop={true}></video>
                            </span>
                            <h1>{t("marco_verratti")}</h1>
                            <p>{t('marco_verratti_content1')}</p>
                        </li>
                        <li>
                            <span className={styles.cover}>
                                <video src="/imgs/Martin_Terrier.mp4" muted={true} playsInline={true} autoPlay={true} loop={true}></video>
                            </span>
                            <h1>{t('lucas_hernández')}</h1>
                            <p>{t('lucas_hernández_content1')}</p>
                        </li>
                        <li>
                            <span className={styles.cover}>
                                <video src="/imgs/video.mp4" muted={true} playsInline={true} autoPlay={true} loop={true}></video>
                            </span>
                            <h1>{t('lucas_hernández')}</h1>
                            <p>{t('lucas_hernández_content1')}</p>
                        </li>
                    </ul>
                </section>
                <section id="nft"  className={styles.plan}>
                    <div className={styles.title}></div>
                    <ul className={styles.content}>
                        <li>
                            <div className={styles.nft}></div>
                            <div className={styles.description}>
                                <h1></h1>
                                <p>{t('nft_content')}</p>
                                <ul>
                                    <li>{t('nft_content1')}</li>
                                    <li>{t('nft_content2')}</li>
                                    <li>{t('nft_content3')}</li>
                                </ul>
                            </div>
                            <i></i>
                        </li>
                        <li>
                            <div className={styles.nft}></div>
                            <div className={styles.description}>
                                <h1></h1>
                                <p>{t('gamefi_content1')} </p>
                                <p>{t('gamefi_content2')}</p>
                                <p>{t('gamefi_content3')}</p>
                            </div>
                        </li>
                    </ul>
                </section>
                <section id="roadmap" className={styles.roadmap}>
                    <div className={styles.title}>{t('roadmap')}</div>
                    <div className={styles.content}>
                        <i className={styles.content_start}></i>
                        <i className={styles.content_line}></i>
                        <i className={styles.content_end}></i>
                        <ul>
                            <li>
                                <h1>{t('roadmap_time1')}</h1>
                                <h2>{t('roadmap_time1_content1')}</h2>
                                <i></i>
                            </li>
                            <li >
                                <h1>{t('roadmap_time2')}</h1>
                                <h2>{t('roadmap_time2_content1')}</h2>
                                <i></i>
                            </li>
                            <li>
                                <h1>{t('roadmap_time3')}</h1>
                                <h2>{t('roadmap_time3_content1')}</h2>
                                <h2>{t('roadmap_time3_content2')}</h2>
                                <i></i>
                            </li>
                            <li >
                                <h1>{t('roadmap_time4')}</h1>
                                <h2>{t('roadmap_time4_content1')}</h2>
                                <i></i>
                            </li>
                            <li>
                                <h1>{t('roadmap_time5')}</h1>
                                <h2>{t('roadmap_time5_content1')}</h2>
                                <i></i>
                            </li>
                            <li>
                                <h1>{t('roadmap_time6')}</h1>
                                <h2>{t('roadmap_time6_content1')}</h2>
                                <i></i>
                            </li>
                            <li>
                                <h1>{t('roadmap_time7')}</h1>
                                <h2>{t('roadmap_time7_content1')}</h2>
                                <i></i>
                            </li>
                            <li>
                                <h1>{t('roadmap_time8')}</h1>
                                <h2>{t('roadmap_time8_content1')}</h2>
                                <i></i>
                            </li>
                        </ul>
                    </div>
                </section>
                <section className={styles.our_partner}>
                    <div className={styles.title}>{t('our_partner')}</div>
                    <Swiper
                        slidesPerView={swapCount}
                        spaceBetween={0}
                        navigation={true}
                        loop={true}
                        modules={[Navigation, Pagination, Keyboard]}
                    >
                        <SwiperSlide><div className="inner team1"></div><div className="outer team1">{t('team1')}</div></SwiperSlide >
                        <SwiperSlide><div className="inner team2"></div><div className="outer team2">{t('team2')}</div></SwiperSlide>
                        <SwiperSlide><div className="inner team3"></div><div className="outer team3">{t('team3')}</div></SwiperSlide>
                        <SwiperSlide><div className="inner team4"></div><div className="outer team4">{t('team4')}</div></SwiperSlide>
                        <SwiperSlide><div className="inner team5"></div><div className="outer team5">{t('team5')}</div></SwiperSlide>
                        <SwiperSlide><div className="inner team6"></div><div className="outer team6">{t('team6')}</div></SwiperSlide>
                        <SwiperSlide><div className="inner team7"></div><div className="outer team7">{t('team7')}</div></SwiperSlide>
                        <SwiperSlide><div className="inner team8"></div><div className="outer team8">{t('team8')}</div></SwiperSlide>
                        <SwiperSlide><div className="inner team9"></div><div className="outer team9">{t('team9')}</div></SwiperSlide>
                        <SwiperSlide><div className="inner team10"></div><div className="outer team10">{t('team10')}</div></SwiperSlide>
                        <SwiperSlide><div className="inner team11"></div><div className="outer team11">{t('team11')}</div></SwiperSlide>
                        <SwiperSlide><div className="inner team12"></div><div className="outer team12">{t('team12')}</div></SwiperSlide>
                        <SwiperSlide><div className="inner team13"></div><div className="outer team13">{t('team13')}</div></SwiperSlide>
                        <SwiperSlide><div className="inner team14"></div><div className="outer team14">{t('team14')}</div></SwiperSlide>
                        <SwiperSlide><div className="inner team15"></div><div className="outer team15">{t('team15')}</div></SwiperSlide>
                        <SwiperSlide><div className="inner team16"></div><div className="outer team16">{t('team16')}</div></SwiperSlide>
                        <SwiperSlide><div className="inner team17"></div><div className="outer team17">{t('team17')}</div></SwiperSlide>
                        <SwiperSlide><div className="inner team18"></div><div className="outer team18">{t('team18')}</div></SwiperSlide>
                        <SwiperSlide><div className="inner team19"></div><div className="outer team19">{t('team19')}</div></SwiperSlide>
                    </Swiper>
                    {/* <ul className={styles.partners}>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <div className={styles.team}></div> */}
                </section>
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
