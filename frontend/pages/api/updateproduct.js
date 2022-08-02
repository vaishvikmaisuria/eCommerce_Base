import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'GET') {

        // const {  pid, product, userInfo  } = req.body;
        const {  pid, product, userInfo  } = req.query;


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo}`
            }
        }

        let userDetails = await axios.put(
            `http://127.0.0.1:8000/api/products/update/${pid}/`,
            product,
            config
          );


        let {data} = userDetails
        res.status(200).json(data)
    }
}