import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Header from "../../components/Header";
// import Paginate from "../../components/Paginate";
import { listProducts, deleteProduct, createProduct } from "../../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../../constants/productConstants";
import { FaEdit, FaTrashAlt, FaCheck, FaPlus } from "react-icons/fa";

export default function ProductListScreen() {
    const dispatch = useDispatch();
    let router = useRouter();

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product: createdProduct } = productCreate;

    useEffect(() => {

        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo.isAdmin) {
            router.push('/login')
        }

        if (successCreate) {
            router.push(`/admin/edit/product/${createdProduct._id}/`)
        } else {
            dispatch(listProducts())
        }



    }, [dispatch, router, userInfo, successDelete, createdProduct]);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            // delete product
            dispatch(deleteProduct(id))
        }
        console.log("delete button pressed");
    };

    const createProductHandler = (id) => {
        if (window.confirm("Are you sure you want to create a new product?")) {
            // create product
            dispatch(createProduct())
        }
        console.log("create button pressed");
    };

    return (
        <div>
            <Header />
            <main className="py-3 mt-3">
                <Container>
                    <Row className="align-items-center">
                        <Col>
                            <h1>Products</h1>
                        </Col>

                        <Col className="text-right">
                            <Button
                                className="my-3 "
                                onClick={createProductHandler}
                            >
                                <i className="buttonIcon">
                                    <FaPlus  color="green" />
                                </i>
                                Create Product
                            </Button>
                        </Col>
                    </Row>

                    {loadingDelete && <Loader />}
                    {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

                    {loadingCreate && <Loader />}
                    {errorCreate && <Message variant='danger'>{errorCreate}</Message>}

                    {loading ? (
                        <Loader />
                    ) : error ? (
                        <Message variant="danger">{error}</Message>
                    ) : (
                        <div>
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
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        <th>BRAND</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>

                                            <td>
                                                <Link
                                                    href={`/admin/edit/product/${product._id}/`}
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
                                                        deleteHandler(
                                                            product._id
                                                        )
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
                            {/* <Paginate
                                pages={pages}
                                page={page}
                                isAdmin={true}
                            /> */}
                        </div>
                    )}
                </Container>
            </main>
        </div>
    );
}
