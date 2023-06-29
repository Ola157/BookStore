import React, { useState } from 'react';
import axios from 'axios';
import { Col, Container, Row, Table, Navbar } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpenReader } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import useMultiple from './custom-hooks/useMultiple';

const AllBooks = () => {
    const navigate = useNavigate()
    const { userId } = useParams()
    let [name, handleName, title, handleTitle, descr, handleDesc, pageNumbers, handlePageNumber, genre, handleGenre, boo, handleBoo, edit, handleEdit] = useMultiple('')
    let [uploaderId, setUpload] = useState(userId)
    let [bookName, setName] = useState('')
    let [user, setUser] = useState('')
    let awesome = <FontAwesomeIcon className='text-white' icon={faUser} />

    useEffect(() => {
        const getAllbooks = async () => {
            try {
                let response = await axios.get("http://localhost:8600/store/allbooks", {})
                let { allbooks } = response.data
                setName(allbooks)
            }
            catch (err) { console.error(err) }
        }
        getAllbooks();
    }, [boo, []])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                let response = await axios.get(`http://localhost:8600/user/fetchuploader/${userId}`, {})
                let { userName } = response.data
                setUser(userName)
            }
            catch (err) {
                console.error(err)
            }
        }

        fetchUser();
    }, [boo, []])

    const pageBtn = async (any) => {
        if (any === 'addbook') {
            if (name !== '' && title !== '' && pageNumbers !== '' && descr !== '' && genre !== '') {
                try {
                    const response = await axios.post("http://localhost:8600/store/addbook", { name, title, pageNumbers, descr, genre, edit: false, uploaderId },
                        {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            }
                        })
                    handleTitle('')
                    handleName('')
                    handlePageNumber('')
                    handleDesc('')
                    handleGenre('')
                    handleBoo(true)
                }
                catch (err) {
                    console.error(err)
                }
            }
            else { alert('Inputs Cant Be Blank') }
        }
        else {
            navigate(`/viewmore/${any}/${userId}`)
        }

    }

    return (<Container fluid className='indisplay pb-5'>
        <Navbar expand="lg" className='bg-black mb-2 icon'>
            <Container>
                <div>
                    <FontAwesomeIcon className='text-white' icon={faBookOpenReader} size="lg" />
                </div>

                <div className='d-xs-none'>
                    <Nav className="me-auto">
                        <NavDropdown title={awesome} id="basic-nav-dropdown" className='bg-black '>
                            <NavDropdown.Item >{user.username}</NavDropdown.Item>
                            <NavDropdown.Item href={`/bookadded/${userId}`}>
                                My Uploads
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/">
                                logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </div>

            </Container>
        </Navbar>

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
                <button className='border rounded w-50' onClick={() => pageBtn('addbook')}>Add</button>
            </Col>
            <hr className='my-0 text-white'></hr>
        </Row>

        <Row className='d-flex justify-content-evenly m-1 '>
            {bookName.length > 0 ?
                bookName.map((book, i) => <Col lg={2} md={3} sm={3} xs={12} key={i} className='p-1 py-3 text-center m-1 bookIcon'>
                    <Col className='m-1'>{book.title}</Col>
                    <hr className='my-0'></hr>
                    <Col className='m-1'>Author: {book.name}</Col>
                    <hr className='my-0'></hr>
                    <Col className='py-0 m-2'><button className='border rounded py-0 my-1 btnAny' onClick={() => pageBtn(book._id)}>view more</button></Col>
                </Col>
                )
                : <Col>No Books Yet</Col>}
        </Row>
    </Container >)
}
export default AllBooks;