//@ts-ignore // TODO: fix this ;(
import {Merchant} from "@types/types";

const geoEncodeAddress = async (address: string) => {

}


const generateRating = (merchant: Merchant): void => {

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

export { generateRating, downloadFile };