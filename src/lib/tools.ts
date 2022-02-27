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

    // Start at an average of 2.5.
    let rating = 5;

    nearbyData = nearbyData.filter((element: any, index: number) => {
        // Check if business is not same as element and is actually operational.
        return ("business_status" in element && element.business_status === "OPERATIONAL");
    }).map((element: any, index: number) => {
        return ({ rating: Number(element.rating) || -1, types: element.types });
    })
    console.log(nearbyData)

    // https://developers.google.com/maps/documentation/places/web-service/supported_types
    nearbyData.forEach((element: any, index: number) => {
        // TODO: compare lists method
        if (element.types.includes("bakery") || element.types.includes("bakery") || element.types.includes("convenience_store")) {
            rating += 3;
        }
        if (element.types.includes("florist")) {
            rating += 2;
        }
        // Being near competition decreases rating
        if (element.types.includes("shopping_mall") || element.types.includes("supermarket")) {
            rating -= 0.5;
        }
    });

    if (rating > 10) {
        rating = 10.0
    }
    if (rating < 0) {
        rating = 0.0
    }

    return rating;
}

const downloadFile = (data: any): void => {

    const filename = "output";
    const json = JSON.stringify(data, null, 4);
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