import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Container } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Header from "../../components/Header";
import { listUsers, deleteUser } from "../../actions/userActions";
import { FaEdit, FaTrashAlt, FaCheck } from "react-icons/fa";

export default function UserListScreen() {
    const dispatch = useDispatch();
    let router = useRouter();

    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userDelete = useSelector((state) => state.userDelete);
    const { success: successDelete } = userDelete;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            router.push("/login");
        }
    }, [dispatch, router, successDelete, userInfo]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser(id));
        }
        console.log("delete button pressed");
    };

    return (
        <div>
            <Header />
            <main className="py-3 mt-3">
                <Container>
                    <h1>Users</h1>
                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant="danger">{error}</Message>
                    ) : (
                        <Table
                            striped
                            bordered
                            hover
                            responsive
                            className="table-sm mt-3"
                        >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {user.isAdmin ? (
                                                <i>
                                                    <FaCheck color="green" />
                                                </i>
                                            ) : (
                                                <i>
                                                    <FaCheck color="red" />
                                                </i>
                                            )}
                                        </td>

                                        <td>
                                            <Link
                                                href={`/admin/edit/${user._id}/`}
                                            >
                                                <Button
                                                    variant="light"
                                                    className="btn-sm"
                                                >
                                                    <i>
                                                        <FaEdit />
                                                    </i>
                                                </Button>
                                            </Link>

                                            <Button
                                                variant="danger"
                                                className="btn-sm"
                                                onClick={() =>
                                                    deleteHandler(user._id)
                                                }
                                            >
                                                <i>
                                                    <FaTrashAlt />
                                                </i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Container>
            </main>
        </div>
    );
}
