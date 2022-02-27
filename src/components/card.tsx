import React from "react";
// @ts-ignore // TODO: fixme
import {Merchant} from "@types/types";
import styles from "@styles/Card.module.css";
import {useRouter} from "next/router";

const Card: React.FC<{merchant: Merchant, merchantId: number}> = ({ merchant, merchantId }) => {

    const router = useRouter();

    return (
        <div className={styles.card} onClick={() => {router.push(`/merchants/${merchantId}`)}}>
            <h2 className={"font-semibold text-3xl"}>
                {merchant.name}
            </h2>
            <p>Address: {merchant.address}</p>
            {merchant.rating && (<p>Rating: {merchant.rating}</p>)}
        </div>
    );
}

export default Card;
