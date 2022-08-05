import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useRouter } from 'next/router'

export default function SearchBox() {
    const [keyword, setKeyword] = useState('')

    const router = useRouter()

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword) {
            router.push(`/?keyword=${keyword}&page=1`)
        }
    }

    return (
        <div className="group-horizontal">

        <Form onSubmit={submitHandler} className="list-group-horizontal formInline">

            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                className='p-2'
            >
                Submit
            </Button>

        </Form>
        </div>
    )
}
