import React from 'react'
import { Pagination } from 'react-bootstrap'
import NextLink from "next/link";

function Paginate({ pages, page, keyword = '', isAdmin = false }) {

    return (pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map((x) => (
                <NextLink key={x + 1} href={!isAdmin ?
                    `/?keyword=${keyword}&page=${x + 1}`
                    : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`} passHref>
                    <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                </NextLink>
            ))}
        </Pagination>
    )
    )
}

export default Paginate