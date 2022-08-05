import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import { listProducts } from '../actions/productActions'
import { useRouter } from 'next/router'


function HomeScreen() {

    const dispatch = useDispatch();
    const router = useRouter();

    const productList = useSelector(state => state.productList)
    let { error, loading, products, page, pages } = productList

    let keyword = router.query.keyword
    let pageNum = router.query.page

    useEffect(() => {
        dispatch(listProducts(keyword, pageNum))

    }, [dispatch, keyword, pageNum])

    return (
        <div>
            {!keyword && <ProductCarousel />}

            <h1 className='mt-3'>Latest Products</h1>
            {loading ? <Loader />
                : error ? <Message variant='danger'>{error}</Message>
                    :
                    <div>
                        <Row>
                            {products && products.map(product => (
                                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                    <Product product={product} />
                                </Col>
                            ))}
                        </Row>
                        <Paginate page={page} pages={pages} keyword={keyword} />
                    </div>
            }
        </div>
    )
}

export default HomeScreen
