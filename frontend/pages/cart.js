import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  Card,
  Image,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Link from "next/link";
import Header from "../components/Header";
import Message from "../components/Message";
import { FaTrash } from "react-icons/fa";

export default function CartScreen() {
  let router = useRouter();
  let productId = router.query["id"];
  let qty = router.query["qty"];

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log("cartItems: ", cartItems);

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const checkoutHandler = () => {
    console.log("check out handler pressed ");
    // router.push(`/login?redirect=shipping`)
  };
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  }

  return (
    <div>
      <Header />
      <main className="py-3">
        <Container>
          <Row>
            <Col md={8}>
              <h1>Shopping Cart</h1>
              {cartItems.length === 0 ? (
                <Message variant="info">
                  Your cart is empty <Link href="/">Go Back</Link>
                </Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item.product}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col md={3}>
                          <Link href={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={2}>${item.price}</Col>

                        <Col md={3}>
                          <Form.Control
                            as="select"
                            value={item.qty}
                            onChange={(e) =>
                              dispatch(
                                addToCart(item.product, Number(e.target.value))
                              )
                            }
                          >
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>

                        <Col md={1}>
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => removeFromCartHandler(item.product)}
                          >
                            <FaTrash />
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Col>

            <Col md={4}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>
                      Subtotal (
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                      items
                    </h2>
                    $
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </ListGroup.Item>
                </ListGroup>

                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
