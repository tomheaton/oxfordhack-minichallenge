//@ts-ignore // TODO: fix this ;(
import {Merchant} from "@types/types";

const generateRatedMerchant = (merchant: Merchant, nearbyData: any): Merchant => {

    let updateMerchant = merchant

    // Add rating to merchant object
    updateMerchant.rating = generateRating(merchant, nearbyData);

    return updateMerchant;
}

const generateRating = (merchant: Merchant, nearbyData: any): number => {

    console.log(`generating rating for: ${merchant.name} @ ${merchant.address}`);

    // TODO: actually calculate rating.
    let rating = 6.9;

    nearbyData = nearbyData.filter((element: any, index: number) => {
        // Check if business is not same as element and is actually operational.
        return ("business_status" in element && element.business_status === "OPERATIONAL");
    }).map((element: any, index: number) => {
        return ({ rating: Number(element.rating) || -1, types: element.types });
    })
    console.log(nearbyData)

    return rating;
}

const downloadFile = (data: any): void => {

    const filename = "output";
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = href;
    link.download = filename + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export { generateRatedMerchant, generateRating, downloadFile };