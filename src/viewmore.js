import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Navbar } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import useMultiple from './custom-hooks/useMultiple';

const ViewMore = ({ amendBtn, doneBtn }) => {
    let { bookId, userId } = useParams()
    let [foundBook, setFound] = useState('')
    let [name, handleName, title, handleTitle, descr, handleDesc, pageNumbers, handlePageNumber, genre, handleGenre, boo, handleBoo] = useMultiple('');
    let [uploader, setUploader] = useState('')

    useEffect(() => {
        const findBookId = async () => {
            try {
                let response = await axios.get(`http://localhost:8500/store/viewmore/${bookId}`, {})
                let { finder } = response.data
                setFound(finder)
            }
            catch (err) {
                console.error(err)
            }
        }
        findBookId();
    }, [boo, []])

    useEffect(() => {
        const findUploader = async () => {
            try {
                let response = await axios.get(`http://localhost:8500/user/uploader/${foundBook.uploaderId}`, {})
                let { uploader } = response.data
                setUploader(uploader)
            }
            catch (err) {
                console.error(err)
            }
        }
        findUploader();
    }, [boo, []])


    return (<Container fluid className='indisplay pb-5'>
        <Navbar className='justify-content-center bg-black mb-2'>
            <FontAwesomeIcon className='text-white' icon={faBookOpenReader} size="lg" />
        </Navbar>
        <Row className='bg-white m-1 border rounded'>
            <Col className='text-start p-2'>
                <Link to={`/allbooks/${userId}`} style={{ textDecoration: 'none', color: 'black' }}> <FontAwesomeIcon icon={faArrowLeft} className='mx-2' />back</Link>
            </Col>
            <hr className='my-0'></hr>
            <Col className='text-center my-2'>
                Book Details
            </Col>
            <hr className='my-0'></hr>
            {foundBook ?
                <div>
                    <Col lg={6} md={6} sm={12} xs={12}>Author - <span className='bod'>{foundBook.edit === false ? foundBook.name : <input onInput={(event) => handleName(event.target.value)} />}</span></Col>
                    <hr className='my-1'></hr>
                    <Col lg={6} md={6} sm={12} xs={12}>Title - <span className='bod'>{foundBook.edit === false ? foundBook.title : <input onInput={(event) => handleTitle(event.target.value)} />}</span></Col>
                    <hr className='my-1'></hr>
                    <Col lg={6} md={6} sm={12} xs={12}>Description - <span className='bod'>{foundBook.edit === false ? foundBook.descr : <input onInput={(event) => handleDesc(event.target.value)} />}</span></Col>
                    <hr className='my-1'></hr>
                    <Col lg={6} md={6} sm={12} xs={12}>Page Number - <span className='bod'>{foundBook.edit === false ? foundBook.pageNumbers : <input onInput={(event) => handlePageNumber(event.target.value)} />}</span></Col>
                    <hr className='my-1'></hr>
                    <Col lg={6} md={6} sm={12} xs={12}>Genre - <span className='bod'>{foundBook.edit === false ? foundBook.genre : <input onInput={(event) => handleGenre(event.target.value)} />}</span></Col>
                    <hr className='my-1'></hr>
                    <Col lg={6} md={6} sm={12} xs={12}>Added by - <span style={{ fontStyle: 'italic' }}>{uploader.username}</span></Col>
                    <hr className='my-1'></hr>
                    <Col lg={2} md={6} sm={12} xs={12} className='text-center'> {foundBook.edit === false ? <button className='border rounded py-0 w-50 m-1' onClick={() => amendBtn('edit', foundBook._id)}>edit</button> : <button className='border rounded py-0 w-50 m-1' onClick={() => doneBtn({ foundBookId: foundBook._id, name, title, descr, pageNumbers, genre })}>done</button>}</Col>
                </div>
                : ''}
        </Row>
    </Container>)
}
export default ViewMore;