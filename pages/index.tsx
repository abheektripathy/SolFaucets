import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { AppBar } from "../components/AppBar";
import { SendSolForm } from "../components/SendSolForm";
import Head from "next/head";
import { HeaderMiddle } from "../components/Header";
import { AppShell, Button, Stack, Title } from '@mantine/core';
import * as Web3 from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";


const Home: NextPage = (props) => {
  const { publicKey } = useWallet();

  async function Airdropifbroke( // just a way of defining parameters
    signer: Web3.PublicKey, connection: Web3.Connection) {

        const balance = await connection.getBalance(signer);
        console.log("Balance: ", balance/Web3.LAMPORTS_PER_SOL, 'SOL');
        //balance check krega 

        if(balance/Web3.LAMPORTS_PER_SOL <1) {
            console.log("Airdropping SOL to account 🚀");
            
            //this is the sig, which requests the airsrop
            const airdropSignature = await connection.requestAirdrop(
                signer,
                1*Web3.LAMPORTS_PER_SOL
            );

                //this here gets latest
            const latestblockhash = await connection.getLatestBlockhash();

            //this here confirms the transaction
            await connection.confirmTransaction({
                blockhash: latestblockhash.blockhash,
                lastValidBlockHeight: latestblockhash.lastValidBlockHeight,
                signature: airdropSignature
            });

            const newBalance = await connection.getBalance(signer);
            console.log('New balance is 🎉', newBalance / Web3.LAMPORTS_PER_SOL, 'SOL');
           
        } else{
            console.log("Account already has SOL 💰, bich dont be greedy");
        }

        

        console.log(publicKey)
        



}
console.log(publicKey)






  return (
    <div>
    <div >
      {/* <Head>
        <title>Wallet-Adapter Example</title>
        <meta
          name="description"
          content="Wallet-Adapter Example"
        />
      </Head>
      <AppBar />
      <div className={styles.AppBody}>
        <p>Display Balance Here</p>
        <SendSolForm />
      </div> */}
      <HeaderMiddle ></HeaderMiddle>
    </div>

    <Stack align="center" > 
    <Title size= '3rem' align="center" >Get Devnet Sol directly Airdropped to your wallet 🚀</Title>  
    <Title size='20px'>gg right?</Title>
    <br></br>
    <br></br>
      <Button variant="light" size="lg" onClick={() => {
        const connection2 = new Web3.Connection(Web3.clusterApiUrl('devnet'))
        Airdropifbroke(publicKey, connection2)}}>
       Let em tokens flow 💸
     </Button>
     </Stack>

     </div>
  );
};

export default Home;
