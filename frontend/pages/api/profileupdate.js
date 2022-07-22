import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'GET') {

        const { userInfo, userParam } = req.query;

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo}`
            }
        }

        let userDetails = await axios.put(
            `http://127.0.0.1:8000/api/users/profile/update/`,
            userParam,
            config
          );

        let {data} = userDetails
        res.status(200).json(data)
    }
}