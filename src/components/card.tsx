import React from "react";
import { Org } from "../pages/types/types";
import styles from "../styles/Card.module.css";

const Card: React.FC<{org: Org}> = ({ org }) => {

    return (
        <div className={styles.card}>
            {/*{JSON.stringify(org, null, 4)}*/}
            <p>name: {org.name}</p>
            <p>address: {org.address}</p>
            <p>organization_type: {org.organization_type}</p>
            <p>phone_number: {org.phone_number}</p>
            <p>Shared Comments: {org["Shared Comments"]}</p>
            <p>Shared Tickets: {org["Shared Tickets"]}</p>
            <p>ssn: {org.ssn}</p>
        </div>
    );
}

export default Card;
