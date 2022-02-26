import {GetServerSideProps, NextPage} from "next";
// @ts-ignore // TODO: fix this
import {Merchant} from "@types/types";
// @ts-ignore
import {ProgressCircle} from 'react-simple-circle-rating';
import styles from "@styles/Index.module.css";

const _data = require("@data/input-alt.json");

type Props = {
    data?: Merchant
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const data = _data[Number(params?.merchant_id) || -1]

    return {
        props: {
            data
        }
    };
}

const MerchantId: NextPage<Props> = (props) => {

    if (props.data) {

        const {name, address, rating} = props.data;

        return (
            <div className={styles.container}>
                <div className={styles.main}>
                    <div className={styles.card}>
                        <h1 className={"text-5xl"}>
                            {name}
                        </h1>
                        <br />
                        <p>Address: {address}</p>
                        <p>Rating: {rating}</p>
                    </div>
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
