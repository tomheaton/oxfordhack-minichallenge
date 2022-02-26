import React from "react";
// @ts-ignore // TODO: fixme
import {Merchant} from "@types/types";
import styles from "@styles/Card.module.css";
import {useRouter} from "next/router";
import merchants from "../pages/merchants";

const Card: React.FC<{merchant: Merchant, merchantId: number}> = ({ merchant, merchantId }) => {

    const router = useRouter();

    return (
        <div className={styles.card} onClick={() => {router.push(`/merchants/${merchantId}`)}}>
            <p>Name: {merchant.name}</p>
            <p>Address: {merchant.address}</p>
            {merchant.rating && (<p>Rating: {merchant.rating}</p>)}
{/*            <p>Organization Type: {merchant.organization_type}</p>
            <p>Phone Number: {merchant.phone_number}</p>
            <p>Shared Comments: {merchant["Shared Comments"]}</p>
            <p>Shared Tickets: {merchant["Shared Tickets"]}</p>
            <p>SSN: {merchant.ssn}</p>*/}
        </div>
    );
}

export default Card;
