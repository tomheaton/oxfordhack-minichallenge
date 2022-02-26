import {NextPage} from "next";
import {useRouter} from "next/router";
// @ts-ignore // TODO: fix this ;(
import {Merchant} from "@types/types";
import Card from "@components/card";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
// @ts-ignore
import { ProgressCircle } from 'react-simple-circle-rating';
import {useContext} from "react";
import {InputContext} from "@lib/input_context";

// const data = require("@data/input.json");

const MerchantId: NextPage = () => {

    const inputContext = useContext(InputContext);

    const router = useRouter();

    const id = Number(router.query?.merchant_id) || -1;

    if (id === -1) {
        return (
            <div>
                <p>Invalid Merchant ID!</p>
            </div>
        );
    }

    // @ts-ignore
    const merchant: Merchant = inputContext.inputData[id - 1]

    const render = (status: Status) => {
        return <h1>{status}</h1>;
    };

    return (

        <div>
            Merchant ID here {id}
            <br/>
            <Card key={id} merchant={merchant} />
            <div>
                {/*<Wrapper apiKey={`${process.env.}`} render={render}>
                    <YourComponent/>
                </Wrapper>*/}
                <ProgressCircle percentage={80} />

                <ProgressCircle
                    percentage={50}
                    color={["#00bd00", "#ffb01f", "#ff3d3d"]}
                    colorBackground="#4d4d4d"
                    textColor="#3d3d3d"
                    size={40}
                />

            </div>
        </div>
    );


}

export default MerchantId;