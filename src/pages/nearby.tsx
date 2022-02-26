import {NextPage} from "next";
import {SyntheticEvent, useState} from "react";

const Nearby: NextPage = () => {

    const [address, setAddress] = useState<string>("");
    const [result, setResult] = useState<any>(null);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        if (isSubmitting) {
            return;
        }

        setIsSubmitting(true);
        setErrorMessage(null);

        try {
            /*const response = await fetch("/api/nearby", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({address})
            });*/

            let encodedAddress = `${encodeURIComponent(address)}`;
            let url = `https://maps.googleapis.com/maps/api/geocode/json?` +
                `address=${encodedAddress}&key=${process.env.GOOGLE_MAPS_API_KEY}`;

            const response = await fetch(url);

            const data = await response.json()
            console.log(data)

            if (data.success) {
                setSuccessMessage(data.message);
                setIsSubmitting(false);
                setResult(data);
                return;
            }

            setErrorMessage(data.message);
            setIsSubmitting(false);
        } catch (e) {
            setErrorMessage("try catch error");
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            {isSubmitting && (<p>loading...</p>)}

            <form onSubmit={handleSubmit} className={""}>
                <label htmlFor={"address"}>
                    Address
                </label>
                <input type={"address"}
                       name={"address"}
                       id={"address"}
                       placeholder={"University of Oxford"}
                       value={address}
                       required={true}
                       onChange={(e) => {setAddress(e.target.value)}}
                />
                <br />
                {errorMessage && (<p>{errorMessage}</p>)}
                <button className={"btn"} type={"submit"}>
                    Get Nearby
                </button>
                {/*<LoadingButton isLoading={isSubmitting} text={"Forgot Password"} />*/}
            </form>

            {
                successMessage && (
                    <>
                        <p>Data successfully returned.</p>
                        {/*<button className={"btn"} onClick={() => {router.push("/")} }>
                            Return Home
                        </button>*/}
                    </>
                )
            }
            <input
                type={"text"}
                onChange={(e) => {setAddress(e.target.value)}}
            />
            <button>
                Find nearby
            </button>

            <p>
                result: {result}
            </p>
        </div>
    );
}

export default Nearby;