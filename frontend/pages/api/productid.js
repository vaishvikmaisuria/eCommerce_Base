import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const query = req.query;
        const { pid } = query;
        let productDetail = {"error": "API Server is not working"};
        productDetail= await axios.get(`http://127.0.0.1:8000/api/products/${pid}`)
        let {data} = productDetail
        res.status(200).json(data)
    }
}