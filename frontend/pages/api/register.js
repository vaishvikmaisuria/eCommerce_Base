import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {

    const { name, email, password } = req.body;

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    let userDetails = await axios.post(
      `http://127.0.0.1:8000/api/users/register/`,
      { name: name, email: email, password: password },
      config
    );

    let { data } = userDetails;
    res.status(200).json(data);
  }
}
