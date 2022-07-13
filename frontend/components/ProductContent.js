import React, { useState } from "react";
import product from "../public/products";
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
import Link from "next/link";

function ProductContent({ productId }) {
  let [qty, setQty] = useState(1);
  let [rating, setRating] = useState(0);
  let [comment, setComment] = useState("");
  let productDetail = product.find((p) => p._id == String(productId));
  const addToCartHandler = () => {
    console.log("Added to cart");
    // history.push(`/cart/${match.params.id}?qty=${qty}`)
  };
  return (
    <div >
      <NextLink href="/" passHref>
        <button className="btn btn-light my-3">Go Back</button>
      </NextLink>

      <Row className='text-center'>
        <Col md={6}>
          <Image src={productDetail.image} alt={productDetail.name} fluid />
        </Col>

        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{productDetail.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                value={productDetail.rating}
                text={`${productDetail.numReviews} reviews`}
                color={"#f8e825"}
              />
            </ListGroup.Item>

            <ListGroup.Item>Price: ${productDetail.price}</ListGroup.Item>

            <ListGroup.Item>
              Description: {productDetail.description}
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
                    <strong>${productDetail.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {productDetail.countInStock > 0
                      ? "In Stock"
                      : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              {productDetail.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col xs="auto" className="my-1">
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(productDetail.countInStock).keys()].map(
                          (x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          )
                        )}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  onClick={addToCartHandler}
                  className="btn-block"
                  disabled={productDetail.countInStock == 0}
                  type="button"
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default ProductContent;
