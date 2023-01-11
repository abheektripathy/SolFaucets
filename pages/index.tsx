/* eslint-disable jsx-a11y/alt-text */
import { NextPage } from "next";
import styles from "../styles/Home.module.css";

import { SendSolForm } from "../components/SendSolForm";
import Head from "next/head";
import { HeaderMiddle } from "../components/Header";
import { AppShell, BackgroundImage, Button, Stack, Title, Image} from "@mantine/core";
import * as Web3 from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import bg from "../public/bg.png";


const Home: NextPage = (props) => {
  const { publicKey } = useWallet();

  async function Airdropifbroke( // just a way of defining parameters
    signer: Web3.PublicKey,
    connection: Web3.Connection
  ) {
    const balance = await connection.getBalance(signer);
    console.log("Balance: ", balance / Web3.LAMPORTS_PER_SOL, "SOL");
    //balance check krega

    if (balance / Web3.LAMPORTS_PER_SOL < 1) {
      console.log("Airdropping SOL to account 🚀");

      //this is the sig, which requests the airsrop
      const airdropSignature = await connection.requestAirdrop(
        signer,
        1 * Web3.LAMPORTS_PER_SOL
      );

      //this here gets latest
      const latestblockhash = await connection.getLatestBlockhash();

      //this here confirms the transaction
      await connection.confirmTransaction({
        blockhash: latestblockhash.blockhash,
        lastValidBlockHeight: latestblockhash.lastValidBlockHeight,
        signature: airdropSignature,
      });

      const newBalance = await connection.getBalance(signer);
      console.log(
        "New balance is 🎉",
        newBalance / Web3.LAMPORTS_PER_SOL,
        "SOL"
      );
    } else {
      console.log("Account already has SOL 💰, bich dont be greedy");
    }
  }

  // const pubkey = new Web3.PublicKey(
  //   "651yky3ijgSPyPZ8L5s1izSbnh5xDHb4GSATk8JLbzsK"
  // );
  // const connection2 = new Web3.Connection(Web3.clusterApiUrl("devnet"));
  // Airdropifbroke(pubkey, connection2);

  console.log(publicKey);

  return (
    <>
      
      <HeaderMiddle></HeaderMiddle>
      <br></br>
      <br></br>
      <br></br>
      
      <Stack align="center">
        <Title size="3rem" align="center">
          Get Devnet Sol directly Airdropped to your wallet 🚀
        </Title>
        <Title size="20px">gg right?</Title>
        <br></br>
        <br></br>
        <Button
          variant="light"
          size="lg"
          onClick={async () => {
            const pubkey = new Web3.PublicKey(
              "651yky3ijgSPyPZ8L5s1izSbnh5xDHb4GSATk8JLbzsK"
            );
            const connection2 = new Web3.Connection(
              Web3.clusterApiUrl("devnet")
            );
            Airdropifbroke(pubkey, connection2);
          }}
        >
          Let em tokens flow 💸
        </Button>
        
       
      </Stack>
     
    </>
  );
};

export default Home;
