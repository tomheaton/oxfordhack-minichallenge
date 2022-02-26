import {NextApiHandler, NextApiRequest, NextApiResponse} from 'next'

type Data = {
    message: string
    success: boolean
    data?: any
}

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { address } = req.query as { address: string };

    // Get location data
    let url = 'https://maps.googleapis.com/maps/api/geocode/json' +
        `?address=${encodeURIComponent(address)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    let result = await fetch(url);
    let data = await result.json()

    // Get nearby data
    const { lat, lng } = data.results[0].geometry.location;
    url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json' +
        `?location=${encodeURIComponent(`${lat},${lng}`)}&radius=1500&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    result = await fetch(url);
    data = await result.json()

    // TODO: rework error checking
    if (result) {
        console.log(JSON.stringify(result));
        return res.status(200).json({ success: true, message: 'Data found', data: data.results });
    }

    return res.status(404).json({ success: false, message: 'No data found' });
}

export default handler;