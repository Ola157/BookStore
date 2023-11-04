import React from 'react';
import { Col, Container, Row, Navbar } from 'react-bootstrap';
import { useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { GiBookmarklet } from 'react-icons/gi';
import { useSelector } from 'react-redux';

const BookStorePage = ({
    handleSearch,
    handleLogout,
    handleNavigate,
    handleFetchBooks }) => {

    const userName = useSelector(state => state.username)
    const searchedBook = useSelector(state => state.searchedBook)
    const allBooks = useSelector(state => state.allBooks)
    const message = useSelector(state => state.message)
    const isLogged = useSelector(state => state.isLogged)


    useEffect(() => {
        if (!isLogged) return handleNavigate('/')
        handleFetchBooks()
    }, [])

    return (<Container fluid className='bookstore-container'>
        <Navbar expand="lg">
            <Navbar.Brand onClick={() => handleNavigate(`/books`)}>
                <GiBookmarklet className='bookBrand' />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavDropdown id="user-dropdown">
                        <NavDropdown.Header>{userName}</NavDropdown.Header>
                        <NavDropdown.Item onClick={() => handleNavigate(`/myuploads`)}>My Uploads</NavDropdown.Item>
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

        <Row className='message-row'>
            <Col className='message-col'>
                {message}
            </Col>
        </Row>

        <Row className='books-row'>

            {allBooks.length > 0 && !searchedBook &&
                allBooks.map((book, i) =>
                (<Col lg={2} md={3} sm={5} xs={10} key={i} className='p-1 py-3 text-center m-1 book-col h-100'>
                    <Col className='m-1'>{book.bookTitle}</Col>
                    <hr className='my-0'></hr>
                    <Col className='m-1'>Author: {book.authorName}</Col>
                    <hr className='my-0'></hr>
                    <Col className='py-0 m-2'>
                        <button className='border rounded py-0 my-1'
                            onClick={() => handleNavigate(`/viewmore/${book._id}`)}>
                            view more
                        </button>
                    </Col>
                </Col>))}

            {searchedBook &&
                <Col lg={2} md={3} sm={3} xs={10} className='p-1 py-3 text-center m-1 book-col h-100'>
                    <Col className='m-1'>{searchedBook.bookTitle}</Col>
                    <hr className='my-0'></hr>
                    <Col className='m-1'>Author: {searchedBook.authorName}</Col>
                    <hr className='my-0'></hr>
                    <Col className='py-0 m-2'>
                        <button className='border rounded py-0 my-1 btnAny'
                            onClick={() => handleNavigate(`/viewmore/${searchedBook._id}`)
                            }>view more</button>
                    </Col>
                </Col>}
        </Row>

        <footer className='footer-container'>
            <Row>
                <Col className="text-center">
                    <p>&copy; {new Date().getFullYear()} BookLovers' Haven. All rights reserved.</p>
                </Col>
            </Row>
        </footer>
    </Container>
    )
}
export default BookStorePage;