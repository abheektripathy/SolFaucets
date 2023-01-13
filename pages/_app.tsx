import { MantineProvider } from "@mantine/core";
import React, { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { NotificationsProvider } from '@mantine/notifications';
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import dynamic from "next/dynamic";

require("@solana/wallet-adapter-react-ui/styles.css");
require("../styles/globals.css");
require("../styles/Home.module.css");

function MyApp({ Component, pageProps }) {
  const network = WalletAdapterNetwork.Devnet;

  // You can provide a custom RPC endpoint here
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new GlowWalletAdapter()],
    [network]
  );

  return (
   
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
          <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{ colorScheme: "dark"}}
    ><NotificationsProvider>
            <Component {...pageProps} />
            </NotificationsProvider>
            </MantineProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
