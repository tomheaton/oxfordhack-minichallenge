import React from "react";
//@ts-ignore // TODO: fixme
import { Merchant } from "../types/types";
import styles from "../styles/Card.module.css";

const Card: React.FC<{merchant: Merchant}> = ({ merchant }) => {

    return (
        <div className={styles.card}>
            <p>Name: {merchant.name}</p>
            <p>Address: {merchant.address}</p>
            <p>Organization Type: {merchant.organization_type}</p>
            <p>Phone Number: {merchant.phone_number}</p>
            <p>Shared Comments: {merchant["Shared Comments"]}</p>
            <p>Shared Tickets: {merchant["Shared Tickets"]}</p>
            <p>SSN: {merchant.ssn}</p>
        </div>
    );
}

export default Card;
