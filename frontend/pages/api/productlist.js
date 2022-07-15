import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        let productList = {"error": "API Server is not working"};
        productList= await axios.get('http://127.0.0.1:8000/api/products/')
        let {data} = productList
        res.status(200).json(data)
    }
}