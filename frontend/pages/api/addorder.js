import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {

        const { order , userInfo } =  req.body;

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo}`
            }
        }

        let userDetails = await axios.post(
            `http://127.0.0.1:8000/api/orders/add/`,
            order,
            config
          );

        let {data} = userDetails
        res.status(200).json(data)
    }
}