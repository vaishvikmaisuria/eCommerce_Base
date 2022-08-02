import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
    Card,
    Col,
    Form,
    Image,
    ListGroup,
    Row,
    Button,
    Container,
} from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
    getOrderDetails,
    payOrder,
    deliverOrder,
} from "../actions/orderActions";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { PayPalButton } from "react-paypal-button-v2";
import {
    ORDER_PAY_RESET,
    ORDER_DELIVER_RESET,
} from "../constants/orderConstants";

function OrderContent({ orderId }) {
    const dispatch = useDispatch();
    let router = useRouter();
    const [sdkReady, setSdkReady] = useState(false);

    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, error, loading } = orderDetails;

    const orderPay = useSelector((state) => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const orderDeliver = useSelector((state) => state.orderDeliver);
    const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    if (!loading && !error) {
        order.itemsPrice = order.orderItems
            .reduce((acc, item) => acc + item.price * item.qty, 0)
            .toFixed(2);
    }

    const addPayPalScript = () => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
            "https://www.paypal.com/sdk/js?client-id=AeZp1cFn_XkX_ldeACCnF_pOhmzk9wt1Il-E0yKIe1_8IsiJGho_TVOcIoNsVRkeQl4Qe0rhDEx9xPr8";
        script.async = true;
        script.onload = () => {
            setSdkReady(true);
        };
        document.body.appendChild(script);
    };

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        }
        if (
            !order ||
            successPay ||
            order._id !== Number(orderId) ||
            successDeliver
        ) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });

            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            addPayPalScript();
            if (!window.paypal) {
                // addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, order, orderId, successPay, successDeliver]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult));
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(order));
    };

    return (
        <div>
            <Header />
            <main className="py-3 mt-3">
                <Container>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant="danger">{error}</Message>
                    ) : (
                        <div>
                            <h1>Order: {order.Id}</h1>
                            <Row>
                                <Col md={8}>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <h2>Shipping</h2>
                                            <p>
                                                <strong>Name: </strong>{" "}
                                                {order.user.name}
                                            </p>
                                            <p>
                                                <strong>Email: </strong>
                                                <a
                                                    href={`mailto:${order.user.email}`}
                                                >
                                                    {order.user.email}
                                                </a>
                                            </p>
                                            <p>
                                                <strong>Shipping: </strong>
                                                {
                                                    order.shippingAddress
                                                        .address
                                                }, {order.shippingAddress.city}
                                                {"  "}
                                                {
                                                    order.shippingAddress
                                                        .postalCode
                                                }
                                                ,{"  "}
                                                {order.shippingAddress.country}
                                            </p>

                                            {order.isDelivered ? (
                                                <Message variant="success">
                                                    Delivered on{" "}
                                                    {order.deliveredAt}
                                                </Message>
                                            ) : (
                                                <Message variant="warning">
                                                    Not Delivered
                                                </Message>
                                            )}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <h2>Payment Method</h2>
                                            <p>
                                                <strong>Method: </strong>
                                                {order.paymentMethod}
                                            </p>
                                            {order.isPaid ? (
                                                <Message variant="success">
                                                    Paid on {order.paidAt}
                                                </Message>
                                            ) : (
                                                <Message variant="warning">
                                                    Not Paid
                                                </Message>
                                            )}
                                        </ListGroup.Item>

                                        <ListGroup.Item>
                                            <h2>Order Items</h2>
                                            {order.orderItems.length === 0 ? (
                                                <Message variant="info">
                                                    Order is empty
                                                </Message>
                                            ) : (
                                                <ListGroup variant="flush">
                                                    {order.orderItems.map(
                                                        (item, index) => (
                                                            <ListGroup.Item
                                                                key={index}
                                                            >
                                                                <Row>
                                                                    <Col md={1}>
                                                                        <Image
                                                                            src={
                                                                                item.image
                                                                            }
                                                                            alt={
                                                                                item.name
                                                                            }
                                                                            fluid
                                                                            rounded
                                                                        />
                                                                    </Col>

                                                                    <Col>
                                                                        <Link
                                                                            href={`/product/${item.product}`}
                                                                        >
                                                                            {
                                                                                item.name
                                                                            }
                                                                        </Link>
                                                                    </Col>

                                                                    <Col md={4}>
                                                                        {
                                                                            item.qty
                                                                        }{" "}
                                                                        X $
                                                                        {
                                                                            item.price
                                                                        }{" "}
                                                                        = $
                                                                        {(
                                                                            item.qty *
                                                                            item.price
                                                                        ).toFixed(
                                                                            2
                                                                        )}
                                                                    </Col>
                                                                </Row>
                                                            </ListGroup.Item>
                                                        )
                                                    )}
                                                </ListGroup>
                                            )}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>

                                <Col md={4}>
                                    <Card>
                                        <ListGroup variant="flush">
                                            <ListGroup.Item>
                                                <h2>Order Summary</h2>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Items:</Col>
                                                    <Col>
                                                        ${order.itemsPrice}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Shipping:</Col>
                                                    <Col>
                                                        ${order.shippingPrice}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Tax:</Col>
                                                    <Col>${order.taxPrice}</Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Total:</Col>
                                                    <Col>
                                                        ${order.totalPrice}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>

                                            {!order.isPaid && (
                                                <ListGroup.Item>
                                                    {loadingPay && <Loader />}

                                                    {!sdkReady ? (
                                                        <Loader />
                                                    ) : (
                                                        <div>
                                                            <PayPalButton
                                                                amount={
                                                                    order.totalPrice
                                                                }
                                                                currency={"CAD"}
                                                                onSuccess={
                                                                    successPaymentHandler
                                                                }
                                                            />
                                                        </div>
                                                    )}
                                                </ListGroup.Item>
                                            )}
                                        </ListGroup>
                                        {loadingDeliver && <Loader />}
                                        {userInfo &&
                                            userInfo.isAdmin &&
                                            order.isPaid &&
                                            !order.isDelivered && (
                                                <ListGroup.Item>
                                                    <Button
                                                        type="button"
                                                        className="btn btn-block"
                                                        onClick={deliverHandler}
                                                    >
                                                        Mark As Delivered
                                                    </Button>
                                                </ListGroup.Item>
                                            )}
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    )}
                </Container>
            </main>
        </div>
    );
}

export default OrderContent;
