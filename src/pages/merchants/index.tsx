import {NextPage} from "next";
import styles from "@styles/Index.module.css";
import Card from "@components/card";
//@ts-ignore // TODO: fix this ;(
import {Merchant} from "@types/types";
import {useState} from "react";

const data = require("@data/input-alt.json");

const Merchants: NextPage = () => {

    const [search, setSearch] = useState<string>("");

    return (
        <div>
            <h1>
                Merchants
            </h1>

            {/*<p>{JSON.stringify(data, null, 4)}</p>*/}

            <div className={styles.cardContainer}>
                {
                    data.map((element: Merchant, index: number) => {
                        return (
                            <Card key={index} merchant={element} />
                        );
                    })
                }
            </div>
        </div>
    );
}

export default Merchants;