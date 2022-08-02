import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Form, Button, Container } from "react-bootstrap";
import axios from 'axios'
import Loader from "./Loader";
import Message from "./Message";
import FormContainer from "./FormContainer";

import { useRouter } from "next/router";
import Header from "./Header";

import { listProductDetails, updateProduct } from "../actions/productActions";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";

function ProductEditorContent({ productId }) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();
    let router = useRouter();

    const productDetails = useSelector((state) => state.productDetails);
    const { error, loading, product } = productDetails;

    const productUpdate = useSelector((state) => state.productUpdate);
    const {
        error: errorUpdate,
        loading: loadingUpdate,
        success: successUpdate,
    } = productUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET });
            router.push("/admin/productlist");
        } else {
            if (!product.name || product._id !== Number(productId)) {
                dispatch(listProductDetails(productId));
            } else {
                setName(product.name);
                setPrice(product.price);
                setImage(product.image);
                setBrand(product.brand);
                setCategory(product.category);
                setCountInStock(product.countInStock);
                setDescription(product.description);
            }
        }
    }, [dispatch, product, productId, router, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: productId,
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description,
            })
        );
    };

    const uploadFileHandler = async (e) => {
        const imageFile = e.target.files[0]
        setImage(e.target.value)

        // console.log( imageFile?.filepath)
        const formData = new FormData()
        formData.append('image', imageFile)
        formData.append('product_id', productId)

        setUploading(true)
        // for (const pair of formData.entries()){
        //     console.log(pair)
        // }


        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('http://127.0.0.1:8000/api/products/upload/', {
                formData,
                config
            });

            // const { data } = await axios.post('/api/uploadimage/', formData, config);

            setImage(data);
            setUploading(false);
        } catch {
            setUploading (false)
        }
    };

    return (
        <div>
            <Header />
            <main className="py-3 mt-3">
                <Container>
                    <Link href="/admin/productlist">Go Back</Link>
                    <FormContainer>
                        <h1>Edit Product: {productId}</h1>
                        {loadingUpdate && <Loader />}
                        {errorUpdate && (
                            <Message variant="danger">{errorUpdate}</Message>
                        )}
                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <Message variant="danger">{error}</Message>
                        ) : (
                            <Form onSubmit={submitHandler}>
                                <Form.Group className=" mt-3" controlId="name">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="name"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group className=" mt-3" controlId="price">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter price"
                                        value={price}
                                        onChange={(e) =>
                                            setPrice(e.target.value)
                                        }
                                    ></Form.Control>
                                </Form.Group>
                                <Form.Group className=" mt-3" controlId="image">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter image"
                                        value={image}
                                        onChange={(e) =>
                                            setImage(e.target.value)
                                        }
                                    ></Form.Control>

                                    <input
                                        type="file"
                                        name="imgfile"
                                        label="Choose File"
                                        onChange={uploadFileHandler}
                                        accept="image/*"
                                        id="image-file"
                                    />
                                    {uploading && <Loader />}
                                </Form.Group>

                                <Form.Group className=" mt-3" controlId="brand">
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter brand"
                                        value={brand}
                                        onChange={(e) =>
                                            setBrand(e.target.value)
                                        }
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group
                                    className=" mt-3"
                                    controlId="countinstock"
                                >
                                    <Form.Label>Stock</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter stock"
                                        value={countInStock}
                                        onChange={(e) =>
                                            setCountInStock(e.target.value)
                                        }
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group controlId="category">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter category"
                                        value={category}
                                        onChange={(e) =>
                                            setCategory(e.target.value)
                                        }
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group
                                    className=" mt-3"
                                    controlId="description"
                                >
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter description"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    ></Form.Control>
                                </Form.Group>

                                <Button
                                    className=" mt-3"
                                    type="submit"
                                    variant="primary"
                                >
                                    Update
                                </Button>
                            </Form>
                        )}
                    </FormContainer>
                </Container>
            </main>
        </div>
    );
}

export default ProductEditorContent;
