import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import FormContainer from "../components/FormContainer";
import { login } from "../actions/userActions";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let router = useRouter();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [router, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div>
      <Header />
      <main className="py-3 mt-3">
        <Container>
          <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
              <Form.Group className=" mt-3" controlId="email">
                <Form.Label> Email Address </Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group className=" mt-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button className=" mt-3" type="submit" variant="primary">
                Sign In
              </Button>
            </Form>
            <Row className="py-3">
              <Col>
                New Customer? <Link href={"/register"}>Register</Link>
              </Col>
            </Row>
          </FormContainer>
        </Container>
      </main>
    </div>
  );
}
