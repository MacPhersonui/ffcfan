import '../styles/globals.scss'
import { UseWalletProvider } from 'use-wallet'
import { appWithTranslation } from 'next-i18next'

function MyApp({ Component, pageProps }) {
  return <UseWalletProvider
        chainId={0x61}
        connectors={{
            walletconnect: {
                rpcUrl: "https://bsc-dataseed1.ninicoin.io/"
            },
        }}
    >
      <Component {...pageProps} />
  </UseWalletProvider>
}

export default appWithTranslation(MyApp)
