import {NextPage} from 'next';
import Head from 'next/head';
import styles from '@styles/Index.module.css';
import {SyntheticEvent, useState} from "react";
import {useRouter} from "next/router";
import {downloadFile, generateRatedMerchant} from "../util/utils";
//@ts-ignore
import {Merchant} from "@types/types";

const data = require("@data/input.json");

const Index: NextPage = () => {

    const router = useRouter();

    const [rawData, setRawData] = useState<any>();

    const [ready, setReady] = useState<boolean>(true);

    // TODO: this.
    const handleGeneration = async (e: SyntheticEvent) => {
        e.preventDefault();

        console.log(`Generating Ratings (count: ${data.length})`);

        await data.map(async (merchant: Merchant, index: number, merchantList: Merchant[]) => {

            const result = await fetch(`/api/nearby?address=${encodeURIComponent(merchant.address)}`);
            const nearbyData = await result.json()

            merchantList[index] = generateRatedMerchant(merchant, nearbyData.data.results);
        });
    }

    const handleDownload = async (e: SyntheticEvent) => {
        e.preventDefault();

        console.log("Downloading Output");

        await downloadFile(data);
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>SaltPay Challenge - Oxford Hack 2022</title>
                <meta name={"description"} content={"Generated by create next app"} />
                <link rel={"icon"} href={"/favicon.ico"} />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    SaltPay Challenge
                </h1>

                {/*TODO: add import data?*/}
                {/*<input type={"file"} />*/}

                <br/>

                <button className={"btn"} onClick={handleGeneration}>
                    Generate Ratings
                </button>

                { ready &&
                    (
                        <button className={"btn"} onClick={handleDownload}>
                            Download Output
                        </button>
                    )
                }

            </main>
        </div>
    );
}

export default Index;
