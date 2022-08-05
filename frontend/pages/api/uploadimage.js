// import axios from "axios";
// import Formidable from "formidable";
// import FormData from "form-data";
// const fs = require('fs')
// // export const config = {
    // api: {
    //     bodyParser: false,
    // },
// // };

// const parseForm = (req) => {
//     var form = new Formidable.IncomingForm();
//     return new Promise(function (resolve, reject) {
//         form.parse(req, (err, fields, files) => {
//             if (err) reject(err);
//             else resolve([fields, files]);
//         });
//     });
// };

// export default async function handler(req, res) {
//     if (req.method === "GET") {

//         // const { pid, filePath } = req.query;

//         const formData = new FormData()
//         fs.readFile(filePath, function(err, data) {
//             if (err) throw err; // Fail if the file can't be read.
//             formData.append('image', data)
//         });

//         const config = {
//             headers: {
//                 'Content-Type': 'multipart/form-data'
//             }
//         }

//         // formData.append('image', file)
//         formData.append('product_id', pid)

//         const { data } = await axios.post(
//             "http://127.0.0.1:8000/api/products/upload/",
//             formData,
//             config
//         );

//         // // data.pipe(res);
//         // let data = { lol: "ducks are cute" };

//         res.status(200).json({ data });
//     } else {
//         return res.status(405).json({ message: "Method Not Allowed" });
//     }
// }

// import Cors from 'cors'
// import FormData from "form-data";
// import { IncomingForm } from "formidable";
// import fs from "fs";

// export const config = {
//     headers: {
//         "Content-Type": "multipart/form-data",
//     },
//     api: {
//         bodyParser: false,
//     },
// };

// export default async function handler(req, res) {
//     // await cors(req, res)

//     // const fData = await new Promise(function (resolve, reject) {
//     //     const form = new IncomingForm({
//     //         multiples: false,
//     //     });

//     //     form.parse(req, (err, fields, files) => {
//     //         if (err) reject(err);
//     //         else resolve([fields, files]);
//     //     });
//     // });
//     console.log("Got here");
//     let resultForm = {};
//     let formFields = await new Promise(function (resolve, reject) {
//         const Form = new IncomingForm({
//             multiples: false,
//         });
//         Form.parse(req, function (err, field, file) {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//             if (field) {
//                 resultForm = Object.assign({}, resultForm, field);
//             }
//             if (file) {
//                 resultForm = Object.assign({}, resultForm, file);
//             }
//             resolve(field);
//         }); // form.parse
//     });

//     // console.log(resultForm)
//     const imageFile = resultForm.imageFile;
//     const tempImagePath = imageFile?.filepath;

//     try {
//         const imageReal = await fs.readFile(tempImagePath);

//         const dataForm = new FormData();

//         dataForm.append("imageFile", imageReal);
//         dataForm.append("product_id", resultForm.product_id);

//         console.log("Holy shitt ");

//         // const config = {
//         //     headers: {
//         //         "Content-Type": "multipart/form-data",
//         //     },
//         // };

//         for (const pair of dataForm.entries()) {
//             console.log(pair);
//         }

//         // const { data } = await axios.post(
//         //     "http://127.0.0.1:8000/api/products/upload/",
//         //     dataForm,
//         //     config
//         // );

//         let data = {"data": "holy not working"}
//         console.log("lol you got here ")
//         // const response = await axios.post(
//         //     `http://127.0.0.1:8000/api/products/upload/`,dataForm, config
//         // );

//         // if (!response.ok) {
//         //     res.status(405).json({ message: "Method Not Allowed" });
//         // }

//         res.status(200).json({ data });
//     } catch (error) {
//     } finally {
//         // console.log(tempImagePath);
//         // if (tempImagePath) {
//         //     await fs.rm(tempImagePath)
//         // }
//     }

//     res.end();
// }


import axios from 'axios';
import FormData from "form-data";
import fs from "fs";

export default async function handler(req, res) {
    if (req.method === 'GET') {

        const query = req.query;
        const { filePath, product_id } = query;

        const imageReal = await fs.readFile(filePath);

        const dataForm = new FormData();

        dataForm.append("imageFile", imageReal);
        dataForm.append("product_id", product_id);

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            api: {
                bodyParser: false,
            },
        }

        let userDetails = await axios.post(
            `http://127.0.0.1:8000/api/products/upload/`,
            dataForm,
            config
          );


        let {data} = userDetails
        res.status(200).json(data)
    }
}
