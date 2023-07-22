import React, { useEffect, useState } from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import useMultiple from './custom-hooks/useMultiple';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const MyUploads = ({ handleEditDone, handleEditdelete, handleAddBook }) => {
    const { userName } = useParams()
    let [userUploads, setUploads] = useState('')
    let [name, handleName, title, handleTitle, descr, handleDesc, pageNumbers, handlePageNumber, genre, handleGenre, boo, handleBoo] = useMultiple('');
    let myJwt = localStorage.getItem('accessToken')

    useEffect(() => {
        const checkUserUploads = async () => {
            try {
                let response = await axios.get(`http://localhost:8600/user/fetchuserUploads/`, {
                    headers: {
                        'Authorization': `Bearer ${myJwt}`
                    }
                })
                let { myUploads } = response.data
                setUploads(myUploads)
            }
            catch (err) { console.error(err) }
        }
        checkUserUploads();

    }, [boo, []])

    const handleUpload = () => {
        if (name !== '' && title !== '' && pageNumbers !== '' && descr !== '' && genre !== '') {
            handleAddBook({ name, title, pageNumbers, descr, genre, edit: false, myJwt })
            handleTitle('')
            handleName('')
            handlePageNumber('')
            handleDesc('')
            handleGenre('')
            handleBoo(true)
        }
        else { alert('Inputs Cant Be Blank') }
    }

    return (<Container fluid className='indisplay pb-5'>
        <Navbar className='justify-content-center bg-black mb-1'>
            <FontAwesomeIcon className='text-white' icon={faBookOpenReader} size="lg" />
        </Navbar>
        <Row className='m-1 border rounded uploads'>
            <Col className='text-start p-2'>
                <Link to={`/allbooks/${userName}`} style={{ textDecoration: 'none', color: 'white' }}> <FontAwesomeIcon icon={faArrowLeft} className='mx-2' />back</Link>
            </Col>
            <hr className='my-0'></hr>
            <Col className='text-center my-2' lg={12}>My Uploads</Col>
            <hr className='my-0'></hr>
        </Row>
        <Row className='d-flex justify-content-evenly bg-transparent m-1'>
            <hr className='my-0 text-white'></hr>
            <Col lg={2} md={2} sm={12} xs={12}>
                <input className='border rounded m-1 text-center w-100' value={name} onInput={(event) => handleName(event.target.value)} placeholder='author name' />
            </Col>
            <Col lg={2} md={2} sm={12} xs={12}>
                <input className='border rounded m-1 text-center w-100' value={title} onInput={(event) => handleTitle(event.target.value)} placeholder='title' />
            </Col>
            <Col lg={2} md={2} sm={12} xs={12}>
                <input className='border rounded m-1 text-center w-100' value={pageNumbers} onInput={(event) => handlePageNumber(event.target.value)} placeholder='page numbers' />
            </Col>
            <Col lg={2} md={2} sm={12} xs={12}>
                <input className='border rounded m-1 text-center w-100' value={descr} onInput={(event) => handleDesc(event.target.value)} placeholder='book description' />
            </Col>
            <Col lg={2} md={2} sm={12} xs={12}>
                <input className='border rounded m-1 text-center w-100' value={genre} onInput={(event) => handleGenre(event.target.value)} placeholder='genre' />
            </Col>
            <Col lg={2} md={2} sm={12} xs={12} className='text-center my-1'>
                <button className='border rounded w-50' onClick={() => handleUpload()}>Add</button>
            </Col>
            <hr className='my-0 text-white'></hr>
        </Row>
        <Row className='d-flex justify-content-evenly m-1'>
            {userUploads ?
                userUploads.map((a, i) =>
                    <Col lg={2} md={3} sm={3} xs={12} key={i} className='border rounded p-1 text-center m-1 bookUploads'>
                        <Col className='p-1'><span>{a.edit === false ? a.title : <input className='border rounded text-center' placeholder='title' onInput={(event) => handleTitle(event.target.value)} />}</span></Col>
                        <hr className='my-0'></hr>
                        <Col className='p-1'>Author: <span>{a.edit === false ? a.name : <input className='border rounded text-center' placeholder='name' onInput={(event) => handleName(event.target.value)} />}</span></Col>
                        <hr className='my-0'></hr>
                        <Col className='p-1'><span>{a.edit === false ? <>{a.pageNumbers} pages</> : <input className='border rounded text-center' placeholder='page numbers' onInput={(event) => handlePageNumber(event.target.value)} />}</span></Col>
                        <hr className='my-0'></hr>
                        <Col className='p-1'>Genre - <span>{a.edit === false ? a.genre : <input className='border rounded text-center' placeholder='genre' onInput={(event) => handleGenre(event.target.value)} />}</span></Col>
                        <hr className='my-0'></hr>
                        <Col className='p-1'>Description - <span>{a.edit === false ? a.descr : <input className='border rounded text-center' placeholder='description' onInput={(event) => handleDesc(event.target.value)} />}</span></Col>
                        <hr className='my-0'></hr>
                        <Col className='text-center m-1'>{a.edit === false ? <button className='border rounded me-1 py-0 btnAny' onClick={() => handleEditdelete('edit', a._id, myJwt)}>Edit</button> : <button className='border rounded me-1 py-0 btnAny' onClick={() => handleEditDone({ foundBookId: a._id, name, title, descr, pageNumbers, genre, myJwt })}> Done</button>}<button className='border rounded mx-1 py-0 btnAny' onClick={() => handleEditdelete('del', a._id)}>Delete</button></Col>
                    </Col>)
                :
                <Col lg={4} md={4} sm={12} xs={12} className='bg-white border rounded p-1 text-center m-1 bg-white'> User Added No Books Yet</Col>
            }
        </Row>
    </Container >)
}
export default MyUploads;