import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Container } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Header from "../../components/Header";
import { listOrders } from "../../actions/orderActions";
import { FaEdit, FaTrashAlt, FaCheck } from "react-icons/fa";

export default function OrderListScreen() {
    const dispatch = useDispatch();
    let router = useRouter();

    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders());
        } else {
            router.push("/login");
        }
    }, [dispatch, router, userInfo]);

    return (
        <div>
            <Header />
            <main className="py-3 mt-3">
                <Container>
                    <h1>Orders</h1>
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
                            className="table-sm"
                        >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>Total</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>
                                            {order.createdAt.substring(0, 10)}
                                        </td>
                                        <td>${order.totalPrice}</td>

                                        <td>
                                            {order.isPaid ? (
                                                order.paidAt.substring(0, 10)
                                            ) : (
                                                <i>
                                                    <FaCheck color="red" />
                                                </i>
                                            )}
                                        </td>

                                        <td>
                                            {order.isDelivered ? (
                                                order.deliveredAt.substring(
                                                    0,
                                                    10
                                                )
                                            ) : (
                                                <i>
                                                    <FaCheck color="red" />
                                                </i>
                                            )}
                                        </td>

                                        <td>
                                            <Link href={`/order/${order._id}`}>
                                                <Button
                                                    variant="light"
                                                    className="btn-sm"
                                                >
                                                    Details
                                                </Button>
                                            </Link>
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
