import React from "react";
import { Container, Nav } from "react-bootstrap";

import NextLink from "next/link";

function CheckoutSteps({ step1, step2, step3, step4 }) {
    // if (!step1) {
    //     step1 = false;
    // }
    // if (!step2) {
    //     step2 = false;
    // }
    // if (!step3) {
    //     step3 = false;
    // }
    // if (!step4) {
    //     step4 = false;
    // }

    return (

            <Container className="justify-content-center mb-4">
                <Nav className="justify-content-center mb-4">
                    <Nav.Item>
                        {step1 ? (
                            <NextLink href="/login" passHref>
                                <Nav.Link>Login</Nav.Link>
                            </NextLink>
                        ) : (
                            <Nav.Link disabled>Login</Nav.Link>
                        )}
                    </Nav.Item>

                    <Nav.Item>
                        {step2 ? (
                            <NextLink href="/shipping" passHref>
                                <Nav.Link>Shipping</Nav.Link>
                            </NextLink>
                        ) : (
                            <Nav.Link disabled>Shipping</Nav.Link>
                        )}
                    </Nav.Item>

                    <Nav.Item>
                        {step3 ? (
                            <NextLink href="/payment" passHref>
                                <Nav.Link>Payment</Nav.Link>
                            </NextLink>
                        ) : (
                            <Nav.Link disabled>Payment</Nav.Link>
                        )}
                    </Nav.Item>

                    <Nav.Item>
                        {step4 ? (
                            <NextLink href="/placeorder" passHref>
                                <Nav.Link>Place Order</Nav.Link>
                            </NextLink>
                        ) : (
                            <Nav.Link disabled>Place Order</Nav.Link>
                        )}
                    </Nav.Item>
                </Nav>
            </Container>
    );
}

export default CheckoutSteps;
