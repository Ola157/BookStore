import React, { useState } from 'react';
import axios from 'axios';
import { Col, Container, Row, Navbar } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { GiBookmarklet } from 'react-icons/gi';
import { useSelector } from 'react-redux';

const AllBooks = ({ handleSearch, handleLogout, handleAllChanges }) => {
    const navigate = useNavigate()
    const { userName } = useParams()
    let [allbooks, setBooks] = useState('')
    let searchedBook = useSelector(state => state.searchedBook)
    let userId = useSelector(state => state.userId)
    let isLogin = useSelector(state => state.isLogin)

    useEffect(() => {
        if (isLogin) {
            const getAllbooks = async () => {
                try {
                    let response = await axios.get("https://book-store-back-end-three.vercel.app/store/allbooks", {})
                    let { allbooks } = response.data
                    setBooks(allbooks)
                }
                catch (err) { console.error(err) }
            }
            getAllbooks();
        }
        else { navigate('/') }
    }, [])


    const handleChanges = (bookId) => {
        handleAllChanges('edit', bookId)
        navigate(`/myUploads/${userName}`)
    }

    return (
        <Container fluid className='page-container'>
            <Navbar expand="lg" className='custom-navbar px-4'>
                <Navbar.Brand href="#">
                    <GiBookmarklet className='bookBrand' />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <NavDropdown id="user-dropdown">
                            <NavDropdown.Header>{userName}</NavDropdown.Header>
                            <NavDropdown.Item onClick={() => navigate(`/myUploads/${userName}`)}>My Uploads</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <Row className='search-row'>
                <Col className='search-col'>
                    <input className='search-input' type="text" placeholder='Search by title' onInput={(e) => handleSearch(e.target.value)} />
                </Col>
            </Row>

            <Row className='books-row my-5'>
                {searchedBook &&
                    <Col lg={2} md={3} sm={3} xs={10} className='p-1 py-3 text-center m-1 book-col h-100'>
                        <Col className='m-1'>{searchedBook.title}</Col>
                        <hr className='my-0'></hr>
                        <Col className='m-1'>Author: {searchedBook.authorName}</Col>
                        <hr className='my-0'></hr>
                        <Col className='py-0 m-2'>
                            <button className='border rounded py-0 my-1 btnAny'
                                onClick={() => navigate(`/viewmore/${searchedBook._id}/${userName}`)
                                }>view more</button>
                        </Col>
                        {userId === searchedBook.uploaderId &&
                            <Col className='py-0 m-1'>
                                <button className='border rounded py-0 my-1 btnAny'
                                    onClick={() => handleChanges(searchedBook._id)}>Edit</button>
                            </Col>}
                    </Col>}
                {allbooks && !searchedBook &&
                    allbooks.map((book, i) => <Col lg={2} md={3} sm={5} xs={10} key={i} className='p-1 py-3 text-center m-1 book-col h-100'>
                        <Col className='m-1'>{book.bookTitle}</Col>
                        <hr className='my-0'></hr>
                        <Col className='m-1'>Author: {book.authorName}</Col>
                        <hr className='my-0'></hr>
                        <Col className='py-0 m-2'>
                            <button className='border rounded py-0 my-1'
                                onClick={() => navigate(`/viewmore/${book._id}/${userName}`)
                                }>view more</button>
                        </Col>
                        {userId === book.uploaderId &&
                            <Col className='py-0 m-2'>
                                <button className='btn-edit'
                                    onClick={() => handleChanges(book._id)}>Edit</button>
                            </Col>}
                    </Col>)}
            </Row>

            <Container fluid className='footer-container'>
                <Row>
                    <Col className="text-center">
                        <p>&copy; {new Date().getFullYear()} BookLovers' Haven. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}
export default AllBooks;