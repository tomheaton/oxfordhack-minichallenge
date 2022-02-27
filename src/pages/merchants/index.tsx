import {NextPage} from "next";
import Card from "@components/card";
//@ts-ignore // TODO: fix this ;(
import {Merchant} from "@types/types";
import {SyntheticEvent, useState} from "react";
import styles from "@styles/Index.module.css";
import {generateRatedMerchant} from "@lib/utils";
import {useRouter} from "next/router";

const data = require("@data/input-alt.json");

const Merchants: NextPage = () => {

    const router = useRouter();

    const [rating, setRating] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("");

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleRating = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            console.log(`Generating Ratings (count: ${data.length})`);

            await data.map(async (merchant: Merchant, index: number, merchantList: Merchant[]) => {

                const result = await fetch(`/api/nearby?address=${encodeURIComponent(merchant.address)}`);
                const nearbyData = await result.json()

                merchantList[index] = generateRatedMerchant(merchant, nearbyData.data.results);
            });

            /*if (nearbyData.success) {
                setSuccessMessage(nearbyData.message);
                setIsSubmitting(false);
                return;
            }*/

            // setErrorMessage(nearbyData.message);
            setIsSubmitting(false);
            setRating(true);
        } catch (e) {
            setErrorMessage("try catch error");
            setIsSubmitting(false);
        }
    }

    return (
        <div className={"flex flex-col w-full items-center justify-content"}>
            {/*<Head>
                <title>Merchant | SaltPay Challenge</title>
                <meta name={"description"} content={"Oxford Hack 2022"} />
                <link rel={"icon"} href={"/favicon.ico"} />
            </Head>*/}
            <div className={"w-2/3"}>
                <h1 className={"mx-2 text-5xl font-bold pt-10 flex justify-between items-center"}>
                    Merchant
                    <span>
                        <button className="btn mx-2" onClick={handleRating}>
                            rate all
                        </button>
                        <button className={"btn mx-2"} onClick={() => {router.push("/merchants")}}>
                        return
                    </button>
                    </span>
                </h1>
                <br />
                <input type={"search"}
                       className={"py-2 mx-2"}
                       value={search}
                       placeholder={"Search for a posting..."}
                       onChange={(e) => {setSearch(e.target.value)}}
                />
                <br />
                {rating && (
                    <div>
                        rating
                    </div>
                )}
                {data && data.length > 0 ? (
                    <div className={styles.grid}>
                        {data.filter((result: Merchant) => result.name.toLowerCase()
                            .includes(search.toLowerCase())).map((merchant: Merchant, index: number) => {
                            return (
                                <Card key={index} merchant={merchant} merchantId={index+1} />
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