import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'GET') {

        const query = req.query;
        const { uid, userInfo, user } = query;


        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo}`
            }
        }

        let userDetails = await axios.put(
            `http://127.0.0.1:8000/api/users/update/${uid}/`,
            user,
            config
          );


        let {data} = userDetails
        res.status(200).json(data)
    }
}