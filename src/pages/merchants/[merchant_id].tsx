import {NextPage} from "next";
import {useRouter} from "next/router";
//@ts-ignore // TODO: fix this ;(
import {Merchant} from "@types/types";
import merchants from "./index";
import Card from "@components/card";

const data = require("@data/input.json");

const MerchantId: NextPage = () => {

    const router = useRouter();

    const id = Number(router.query?.merchant_id) || -1;

    if (id === -1) {
        return (
            <div>
                <p>Invalid Merchant ID!</p>
            </div>
        );
    }

    const merchant: Merchant = data[id - 1]

    return (

        <div>
            Merchant ID here {id}
            <br/>
            <Card key={id} merchant={merchant} />
        </div>
    );


}

export default MerchantId;