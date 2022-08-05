import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'GET') {

        const { pid } = req.query;

        let productDetail= await axios.get(`http://127.0.0.1:8000/api/products/${pid}`)
        let {data} = productDetail
        res.status(200).json(data)
    }
}