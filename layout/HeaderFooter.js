import styles from "../styles/layout.module.scss"
import Head from "next/head"
import Header from "./Header"
import Footer from "./Footer"
import React, { useState, useEffect } from 'react'
import { findDOMNode } from 'react-dom'

const HeaderFooter = (props) => {

  const { activeIndex , scrolling } = props
  const [progress, setProgress] = useState(0)

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>FFC - Build the first league in the Web3 world</title>
        <meta charSet="utf-8" />
        <meta name="renderer" content="webkit" />
        <meta name="author" content="FFC" />
        <meta name="generator" content="FFC" />
        <meta name="copyright" content="FFC" />
        {/* <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
          <meta httpEquiv="Cache-Control" content="no-transform" />
          <meta httpEquiv="Cache-Control" content="no-siteapp" /> */}
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="bookmark" href="/favicon.ico" />
        <meta name="description" content="FFC" />
        <meta name="keywords" content="FFC" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <script src="/js/viewport.js"></script>
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-24E5BG0T8G"></script> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              
              `
          }}
        />
      </Head>
      <Header activeIndex={activeIndex} scrolling={scrolling} />
      <main className={styles.main}>{props.children}</main>
      <Footer />
    </div>
  )
};

export default HeaderFooter;
