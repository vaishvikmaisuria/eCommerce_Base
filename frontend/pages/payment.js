import { useRouter } from "next/router";
import React, { useState } from "react";
import { Col, Form, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import Header from "../components/Header";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentScreen() {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch();
    let router = useRouter();

    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    if (!shippingAddress.address) {
        router.push("/shipping");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        router.push("/placeorder");
    };

    return (
        <div>
            <Header />
            <main className="py-3">
                <Container>
                    <CheckoutSteps step1 step2 step3 />
                    <FormContainer>
                        <h1>Payment Screen</h1>
                        <Form onSubmit={submitHandler}>
                            <Form.Group>
                                <Form.Label as="legend">
                                    Select Method
                                </Form.Label>
                                <Col>
                                    <Form.Check
                                        className=" mt-3"
                                        type="radio"
                                        label="PayPal or Credit Card"
                                        id="paypal"
                                        name="paymentMethod"
                                        checked
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                    ></Form.Check>
                                </Col>
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
