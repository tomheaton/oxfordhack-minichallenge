import {NextPage} from "next";
import Card from "@components/card";
//@ts-ignore // TODO: fix this ;(
import {Merchant} from "@types/types";
import {useState} from "react";
import styles from "@styles/Index.module.css";

const data = require("@data/input-alt.json");

const Merchants: NextPage = () => {

    const [search, setSearch] = useState<string>("");

    return (
        <div className={"flex flex-col w-full items-center justify-content"}>
            {/*<Head>
                <title>Merchant | SaltPay Challenge</title>
                <meta name={"description"} content={"Oxford Hack 2022"} />
                <link rel={"icon"} href={"/favicon.ico"} />
            </Head>*/}
            <div className={"w-2/3"}>
                <h1 className={"text-5xl font-bold pt-10"}>
                    Merchant
                </h1>
                <br />
                <input type={"search"}
                       value={search}
                       placeholder={"Search for a posting..."}
                       onChange={(e) => {setSearch(e.target.value)}}
                />
                <br/>
                {data && data.length > 0 ? (
                    <div className={styles.grid}>
                        {data.filter((result: Merchant) => result.name.toLowerCase()
                            .includes(search.toLowerCase())).map((merchant: Merchant, index: number) => {
                            return (
                                <Card key={index} merchant={merchant} merchantId={index} />
                            );
                        })}
                    </div>
                ) : (
                    <p>no merchants found</p>
                )}
            </div>
        </div>
    );
}

export default Merchants;