import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps"

export default function ShippingScreen() {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch();
    let router = useRouter();

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        router.push("/payment");
    };

    return (
        <div>
            <Header />
            <main className="py-3">
                <Container>
                <CheckoutSteps step1 step2  />
                    <FormContainer>

                        <h1>Shipping Screen</h1>
                        <Form className=" mt-3" onSubmit={submitHandler}>
                            <Form.Group controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter address"
                                    value={address ? address : ""}
                                    onChange={(e) => setAddress(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className=" mt-3" controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter city"
                                    value={city ? city : ""}
                                    onChange={(e) => setCity(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group
                                className=" mt-3"
                                controlId="postalCode"
                            >
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter postal code"
                                    value={postalCode ? postalCode : ""}
                                    onChange={(e) =>
                                        setPostalCode(e.target.value)
                                    }
                                ></Form.Control>
                            </Form.Group>

                            <Form.Group className=" mt-3" controlId="country">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Enter country"
                                    value={country ? country : ""}
                                    onChange={(e) => setCountry(e.target.value)}
                                ></Form.Control>
                            </Form.Group>

                            <Button
                                className=" mt-3"
                                type="submit"
                                variant="primary"
                            >
                                Continue
                            </Button>
                        </Form>
                    </FormContainer>
                </Container>
            </main>
        </div>
    );
}
