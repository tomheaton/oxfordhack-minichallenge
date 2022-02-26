//@ts-ignore // TODO: fix this ;(
import {Merchant} from "@types/types";

const generateRatedMerchant = (merchant: Merchant, nearbyData: any): Merchant => {

    let updateMerchant = merchant

    // Add rating to merchant object
    updateMerchant.rating = generateRating(merchant, nearbyData);

    return updateMerchant;
}

const generateRating = (merchant: Merchant, nearbyData: any): number => {

    // TODO: actually calculate rating.
    let rating = 6.9;

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