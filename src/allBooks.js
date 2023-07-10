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
import { useSelector } from 'react-redux';

const AllBooks = ({ handleSearch, handleLogout }) => {
    const navigate = useNavigate()
    const { userName } = useParams()
    let [bookName, setName] = useState('')
    let awesome = <FontAwesomeIcon className='text-white' icon={faUser} />
    let [boo, handleBoo] = useMultiple()
    let [searchValue, setValue] = useState('')
    let searchedBook = useSelector(state => state.searchedBook)

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

    const handleViewmore = async (bookId) => {
        navigate(`/viewmore/${bookId}/${userName}`)
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
                            <NavDropdown.Item >{userName}</NavDropdown.Item>
                            <NavDropdown.Item onClick={() => navigate(`/myUploads/${userName}`)} >
                                My Uploads
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={() => handleLogout()} >
                                logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </div>

            </Container>
        </Navbar>
        <Row className='d-flex justify-content-evenly'>
            <Col lg={12} md={12} sm={12} xs={12}>
                <input className='border rounded text-center w-100' placeholder='seach by title' onInput={(event) => handleSearch(event.target.value)} />
            </Col>
        </Row>
        <Row className='d-flex justify-content-evenly m-1 '>
            {searchedBook ?
                <Col lg={2} md={3} sm={3} xs={12} className='p-1 py-3 text-center m-1 bookIcon h-100'>
                    <Col className='m-1'>{searchedBook.title}</Col>
                    <hr className='my-0'></hr>
                    <Col className='m-1'>Author: {searchedBook.name}</Col>
                    <hr className='my-0'></hr>
                    <Col className='py-0 m-2'><button className='border rounded py-0 my-1 btnAny' onClick={() => handleViewmore(searchedBook._id)}>view more</button></Col>
                </Col> :
                bookName ?
                    bookName.map((book, i) => <Col lg={2} md={3} sm={3} xs={12} key={i} className='p-1 py-3 text-center m-1 bookIcon h-100'>
                        <Col className='m-1'>{book.title}</Col>
                        <hr className='my-0'></hr>
                        <Col className='m-1'>Author: {book.name}</Col>
                        <hr className='my-0'></hr>
                        <Col className='py-0 m-2'><button className='border rounded py-0 my-1 btnAny' onClick={() => handleViewmore(book._id)}>view more</button></Col>
                    </Col>
                    ) : ''
            }
        </Row>
    </Container >)
}
export default AllBooks;