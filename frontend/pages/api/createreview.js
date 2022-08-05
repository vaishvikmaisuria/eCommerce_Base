import axios from "axios";

export default async function handler(req, res) {
    if (req.method === "GET") {
        const query = req.query;
        const { userInfo, pid, review } = query;

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo}`,
            },
        };
        try {
            let userDetails = await axios.post(
                `http://127.0.0.1:8000/api/products/${pid}/reviews/`,
                review,
                config
            );

            let { data } = userDetails;

            res.status(200).json(data);
        } catch (error) {
            res.status(400).json(error.response.data);
        }
    }
}
