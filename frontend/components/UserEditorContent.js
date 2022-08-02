import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
    Form,
    Button,
    Container,
} from "react-bootstrap";

import Loader from "./Loader";
import Message from "./Message";
import FormContainer from "./FormContainer";

import { useRouter } from "next/router";
import Header from "./Header";

import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

function UserEditorContent({ userId }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();
    let router = useRouter();

    const userDetails = useSelector((state) => state.userDetails);
    const { error, loading, user } = userDetails;

    const userUpdate = useSelector((state) => state.userUpdate);
    const {
        error: errorUpdate,
        loading: loadingUpdate,
        success: successUpdate,
    } = userUpdate;


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            router.push("/admin/userlist");
        } else {
            if (!user.name || user._id !== Number(userId)) {
                dispatch(getUserDetails(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [user, userId, successUpdate, router]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({ _id: user._id, name, email, isAdmin }));
    }

    return (
        <div>
            <Header />
            <main className="py-3 mt-3">
                <Container>
                    <Link href="/admin/userlist">Go Back</Link>
                    <FormContainer>
                        <h1>Edit User: {userId}</h1>
                        {loadingUpdate && <Loader />}
                        {errorUpdate && (
                            <Message variant="danger">{errorUpdate}</Message>
                        )}

                        {loading ? (
                            <Loader />
                        ) : error ? (
                            <Message variant="danger">{error}</Message>
                        ) : (
                            <Form  onSubmit={submitHandler}>
                                <Form.Group className=" mt-3"  controlId="name">
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

                                <Form.Group className=" mt-3" controlId="email">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter Email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    ></Form.Control>
                                </Form.Group>

                                <Form.Group className=" mt-3" controlId="isadmin">
                                    <Form.Check
                                        type="checkbox"
                                        label="Is Admin"
                                        checked={isAdmin}
                                        onChange={(e) =>
                                            setIsAdmin(e.target.checked)
                                        }
                                    ></Form.Check>
                                </Form.Group>

                                <Button className="mt-3" type="submit" variant="primary">
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

export default UserEditorContent;
