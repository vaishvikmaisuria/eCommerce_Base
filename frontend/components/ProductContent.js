import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NextLink from "next/link";
import {
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
  Button,
} from "react-bootstrap";
import Rating from "./Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails } from "../actions/productActions";
import { useRouter } from 'next/router'
import Header from '../components/Header'

function ProductContent({ productId }) {
  let [qty, setQty] = useState(1);
  let [rating, setRating] = useState(0);
  let [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const router = useRouter()
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    async function fetchProducts() {
      dispatch(listProductDetails(productId));
    }
    fetchProducts();
  }, [dispatch, productId ]);

  const addToCartHandler = (e) => {
    e.preventDefault()

      // router.push(`/cart?pid=${productId}&?qty=${qty}`)

    router.push({
        pathname: '/cart',
        query: { id: productId, qty: qty },

      });
  };

  return (
    <div>
      <Header/>
      <NextLink href="/" passHref>
        <button className="btn btn-light my-3">Go Back</button>
      </NextLink>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="text-center">
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>

              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>

              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col xs="auto" className="my-1">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    disabled={product.countInStock == 0}
                    type="button"
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductContent;
