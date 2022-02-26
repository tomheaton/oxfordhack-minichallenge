import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next'

type Data = {
    message: string
    success: boolean
    data?: any
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { location, radius, type, keyword } = req.query;

    let a = "-33.8670522%2C151.1957362";
    let r = 1500;
    let t = "restaurant";
    let k = "cruise";

    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json' +
            `?location=${location}&radius=${radius}&type=${type}&keyword=${keyword}` +
            `&key=${process.env.GOOGLE_MAPS_API_KEY}`;

    const result = await fetch(url);

    console.log(result)

    if (result) {
        console.log(JSON.stringify(result));
        return res.status(200).json({ success: true, message: 'Data found', data: result });
    }

    return res.status(404).json({ success: false, message: 'No data found' });
}

export default handler;