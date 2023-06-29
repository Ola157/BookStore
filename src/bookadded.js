import React, { useEffect, useState } from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import useMultiple from './custom-hooks/useMultiple';

const BookAdded = ({ doneBtn, amendBtn }) => {
    const { userId } = useParams()
    let [user, setUser] = useState('')
    let [name, handleName, title, handleTitle, descr, handleDesc, pageNumbers, handlePageNumber, genre, handleGenre, boo, handleBoo] = useMultiple('');

    useEffect(() => {
        const checkUser = async () => {
            try {
                let response = await axios.get(`http://localhost:8600/user/fetchuser/${userId}`, {})
                let { result } = response.data
                setUser(result)
            }
            catch (err) { console.error(err) }
        }
        checkUser();
    }, [boo, []])

    return (<Container fluid className='indisplay pb-5'>
        <Navbar className='justify-content-center bg-black mb-1'>
            <FontAwesomeIcon className='text-white' icon={faBookOpenReader} size="lg" />
        </Navbar>
        <Row className='m-1 border rounded uploads'>
            <Col className='text-start p-2'>
                <Link to={`/allbooks/${userId}`} style={{ textDecoration: 'none', color: 'white' }}> <FontAwesomeIcon icon={faArrowLeft} className='mx-2' />back</Link>
            </Col>
            <hr className='my-0'></hr>
            <Col className='text-center my-2' lg={12}>My Uploads</Col>
            <hr className='my-0'></hr>
        </Row>

        <Row className='d-flex justify-content-evenly m-1'>
            {user ?
                user.map((a, i) =>
                    <Col lg={2} md={3} sm={3} xs={12} key={i} className='border rounded p-1 text-center m-1 bookIcon'>
                        <Col className='p-1'><span>{a.edit === false ? a.title : <input className='border rounded' onInput={(event) => handleTitle(event.target.value)} />}</span></Col>
                        <hr className='my-0'></hr>
                        <Col className='p-1'>Author: <span>{a.edit === false ? a.name : <input className='border rounded' onInput={(event) => handleName(event.target.value)} />}</span></Col>
                        <hr className='my-0'></hr>
                        <Col className='p-1'><span>{a.edit === false ? <>{a.pageNumbers} pages</> : <input className='border rounded' onInput={(event) => handlePageNumber(event.target.value)} />}</span></Col>
                        <hr className='my-0'></hr>
                        <Col className='p-1'>Genre - <span>{a.edit === false ? a.genre : <input className='border rounded' onInput={(event) => handleGenre(event.target.value)} />}</span></Col>
                        <hr className='my-0'></hr>
                        <Col className='p-1'>Description - <span>{a.edit === false ? a.descr : <input className='border rounded' onInput={(event) => handleDesc(event.target.value)} />}</span></Col>
                        <hr className='my-0'></hr>
                        <Col className='text-center m-1'>{a.edit === false ? <button className='border rounded me-1 py-0 btnAny' onClick={() => amendBtn('edit', a._id)}>Edit</button> : <button className='border rounded me-1 py-0 btnAny' onClick={() => doneBtn({ foundBookId: a._id, name, title, descr, pageNumbers, genre })}> Done</button>}<button className='border rounded mx-1 py-0 btnAny' onClick={() => amendBtn('del', a._id)}>Delete</button></Col>
                    </Col>)
                :
                <Col lg={2} md={3} sm={3} xs={12} className='bg-white border rounded p-1 text-center m-1 bg-white'> User Added No Books Yet</Col>
            }
        </Row>
    </Container >)
}
export default BookAdded;