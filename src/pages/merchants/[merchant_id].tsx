import {GetServerSideProps, NextPage} from "next";
// @ts-ignore // TODO: fix this
import {Merchant} from "@types/types";
// @ts-ignore
import {ProgressCircle} from 'react-simple-circle-rating';
import styles from "@styles/Merchant.module.css";
import {SyntheticEvent, useState} from "react";
import {generateRatedMerchant} from "@lib/tools";
import {useRouter} from "next/router";

const _data = require("@data/input-alt.json");

type Props = {
    merchant?: Merchant
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    let merchant = null

    if (Number(params?.merchant_id) >= 0) {
        console.log(merchant)
        merchant = _data[Number(params?.merchant_id)]
    }

    return {
        props: {
            merchant
        }
    };
}

const MerchantId: NextPage<Props> = (props) => {

    const router = useRouter();

    let merchant = props.merchant;

    const [showRating, setShowRating] = useState<boolean>(false);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleRating = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (isSubmitting || !merchant) {
            return;
        }

        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            const result = await fetch(`/api/nearby?address=${encodeURIComponent(merchant.address)}`);
            const nearbyData = await result.json()

            merchant = generateRatedMerchant(merchant, nearbyData.data.results);

            setShowRating(true)

            if (nearbyData.success) {
                setSuccessMessage(nearbyData.message);
                setIsSubmitting(false);
                return;
            }

            setErrorMessage(nearbyData.message);
            setIsSubmitting(false);
        } catch (e) {
            setErrorMessage("try catch error");
            setIsSubmitting(false);
        }
    }

    if (props.merchant) {

        const {name, address, rating} = props.merchant;

        return (
            <div className={styles.container}>
                <div className={styles.main}>
                    <div className={styles.card}>
                        <h1 className={"text-5xl"}>
                            {name}
                        </h1>
                        <br />
                        <p>Address: {address}</p>
                        {rating && (<p>Rating: {rating.toFixed(1)}</p>)}
                    </div>

                    {
                        showRating && rating ? (
                            <ProgressCircle
                                percentage={rating.toFixed(1)}
                                color={"white"}
                                colorBackground={"#7561e3"}
                                textColor={"black"}
                                size={30}
                            />
                        ) : (
                            <>
                                <button className={"btn"} onClick={handleRating}>
                                    get rating
                                </button>
                                <br />
                            </>
                        )
                    }

                    <br/>
                    <button className={"btn"} onClick={() => {router.push("/merchants")}}>
                        return
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <h1 className={"text-5xl"}>
                    No merchant found with that id!
                </h1>
            </div>
        </div>
    );
}

export default MerchantId;
