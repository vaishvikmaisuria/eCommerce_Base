import axios from "axios";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const { keyword, page } = req.query;
        let productList = { error: "API Server is not working" };
        if (keyword == "") {
            productList = await axios.get(
                "http://127.0.0.1:8000/api/products/",
                {
                    params: {
                        page: page,
                    },
                }
            );
        } else {
            productList = await axios.get(
                "http://127.0.0.1:8000/api/products/",
                {
                    params: {
                        keyword: keyword,
                        page: page,
                    },
                }
            );
        }

        let { data } = productList;
        res.status(200).json(data);
    }
}
