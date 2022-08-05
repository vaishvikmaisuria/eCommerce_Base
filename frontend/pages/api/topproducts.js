import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'GET') {

        let userDetails = await axios.get(
            `http://127.0.0.1:8000/api/products/top/`,
          );


        let {data} = userDetails
        res.status(200).json(data)
    }
}